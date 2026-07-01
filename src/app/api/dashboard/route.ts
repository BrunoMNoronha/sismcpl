import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalComercios, totalProdutores, totalProdutos, totalVisitas, totalDemandas, totalCapacidades] =
      await Promise.all([
        prisma.comercio.count({ where: { ativo: true } }),
        prisma.produtor.count({ where: { ativo: true } }),
        prisma.produto.count({ where: { ativo: true } }),
        prisma.visitaCampo.count(),
        prisma.demandaComercial.count(),
        prisma.capacidadeProdutiva.count(),
      ])

    // Produtos mais demandados
    const demandasAgrupadas = await prisma.demandaComercial.groupBy({
      by: ['produtoId'],
      _sum: { quantidadeMensalEstimada: true },
      orderBy: { _sum: { quantidadeMensalEstimada: 'desc' } },
      take: 5,
    })

    const produtosMaisDemandados = await Promise.all(
      demandasAgrupadas.map(async (d) => {
        const produto = await prisma.produto.findUnique({ where: { id: d.produtoId } })
        return {
          produto: produto?.nome ?? 'Desconhecido',
          totalMensal: d._sum.quantidadeMensalEstimada ?? 0,
          unidade: produto?.unidadeMedida ?? '',
        }
      })
    )

    return NextResponse.json({
      totalComercios,
      totalProdutores,
      totalProdutos,
      totalVisitas,
      totalDemandas,
      totalCapacidades,
      produtosMaisDemandados,
    })
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar dados do dashboard' }, { status: 500 })
  }
}
