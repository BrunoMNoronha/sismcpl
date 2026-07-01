import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { classificarOportunidade } from '@/utils'

export async function GET() {
  try {
    // Buscar todos os produtos com demandas ou capacidades
    const produtos = await prisma.produto.findMany({
      where: { ativo: true },
      include: {
        categoria: true,
        demandas: {
          include: { comercio: true },
        },
        capacidades: {
          include: { produtor: true },
        },
      },
    })

    const oportunidades = produtos
      .filter((p) => p.demandas.length > 0 || p.capacidades.length > 0)
      .map((produto) => {
        const demandaMensal = produto.demandas.reduce(
          (acc, d) => acc + (d.quantidadeMensalEstimada ?? 0),
          0
        )

        const ofertaLocal = produto.capacidades
          .filter((c) => c.produzAtualmente)
          .reduce((acc, c) => acc + (c.quantidadeMensalEstimada ?? 0), 0)

        const ofertaPotencial = produto.capacidades
          .filter((c) => c.poderiaProdzir)
          .reduce((acc, c) => acc + (c.quantidadeMensalEstimada ?? 0), 0)

        const origens = produto.demandas.map((d) => d.origemAtual).filter(Boolean) as string[]
        const origemPredominante = origens.length > 0
          ? origens.sort((a, b) =>
              origens.filter((v) => v === b).length - origens.filter((v) => v === a).length
            )[0]
          : 'desconhecida'

        const dificuldades = produto.demandas.map((d) => d.dificuldadeAbastecimento)
        const dificuldadePredominante = dificuldades.includes('alta')
          ? 'alta'
          : dificuldades.includes('media')
          ? 'media'
          : 'baixa'

        const comerciosInteressados = produto.demandas.filter((d) => d.aceitaFornecedorLocal).length
        const produtoresAptos = produto.capacidades.length

        const classificacao = classificarOportunidade({
          demandaMensal,
          ofertaLocal,
          ofertaPotencial,
          origemAtual: origemPredominante,
          dificuldadeAbastecimento: dificuldadePredominante,
          produtoresAptos,
        })

        return {
          produtoId: produto.id,
          produto: produto.nome,
          categoria: produto.categoria.nome,
          unidadeMedida: produto.unidadeMedida,
          demandaMensalEstimada: Math.round(demandaMensal * 100) / 100,
          ofertaLocalEstimada: Math.round(ofertaLocal * 100) / 100,
          ofertaPotencialEstimada: Math.round(ofertaPotencial * 100) / 100,
          origemAtualPredominante: origemPredominante,
          comerciosInteressados,
          produtoresAptos,
          dificuldadeAbastecimento: dificuldadePredominante,
          classificacao,
        }
      })
      .sort((a, b) => {
        const ordem = { alta: 0, media: 1, baixa: 2, sem_dados: 3 }
        return (ordem[a.classificacao] ?? 3) - (ordem[b.classificacao] ?? 3)
      })

    return NextResponse.json(oportunidades)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erro ao calcular oportunidades' }, { status: 500 })
  }
}
