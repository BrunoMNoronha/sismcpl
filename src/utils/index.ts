import { ClassificacaoOportunidade, Frequencia } from '@/types'

/**
 * Calcula a quantidade mensal estimada com base na frequência
 */
export function calcularQuantidadeMensal(quantidade: number, frequencia: string): number {
  const multiplicadores: Record<string, number> = {
    diario: 30,
    semanal: 4.33,
    quinzenal: 2,
    mensal: 1,
  }
  const mult = multiplicadores[frequencia] ?? 1
  return Math.round(quantidade * mult * 100) / 100
}

/**
 * Classifica a oportunidade de um produto com base em demanda e oferta
 */
export function classificarOportunidade({
  demandaMensal,
  ofertaLocal,
  ofertaPotencial,
  origemAtual,
  dificuldadeAbastecimento,
  produtoresAptos,
}: {
  demandaMensal: number
  ofertaLocal: number
  ofertaPotencial: number
  origemAtual: string
  dificuldadeAbastecimento: string
  produtoresAptos: number
}): ClassificacaoOportunidade {
  if (demandaMensal === 0) return 'sem_dados'

  const compraDeFora = origemAtual === 'regional' || origemAtual === 'estadual' || origemAtual === 'nacional'
  const altaDificuldade = dificuldadeAbastecimento === 'alta' || dificuldadeAbastecimento === 'media'
  const temProdutor = produtoresAptos > 0

  // Oportunidade Alta: demanda supera oferta, compra de fora, dificuldade alta/média, tem produtor
  if (demandaMensal > ofertaLocal && compraDeFora && altaDificuldade && temProdutor) {
    return 'alta'
  }

  // Oportunidade Média: demanda existente, alguma oferta ou potencial, pode expandir
  if (demandaMensal > 0 && (ofertaLocal > 0 || ofertaPotencial > 0) && temProdutor) {
    return 'media'
  }

  // Oportunidade Baixa: baixa demanda ou oferta suficiente
  if (demandaMensal <= ofertaLocal && demandaMensal > 0) {
    return 'baixa'
  }

  return 'sem_dados'
}

/**
 * Retorna o label da classificação de oportunidade
 */
export function labelOportunidade(classificacao: ClassificacaoOportunidade): string {
  const labels: Record<ClassificacaoOportunidade, string> = {
    alta: 'Oportunidade Alta',
    media: 'Oportunidade Média',
    baixa: 'Oportunidade Baixa',
    sem_dados: 'Sem Dados Suficientes',
  }
  return labels[classificacao]
}

/**
 * Retorna a cor da badge de oportunidade
 */
export function corOportunidade(classificacao: ClassificacaoOportunidade): string {
  const cores: Record<ClassificacaoOportunidade, string> = {
    alta: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    media: 'bg-amber-100 text-amber-800 border-amber-200',
    baixa: 'bg-slate-100 text-slate-600 border-slate-200',
    sem_dados: 'bg-gray-100 text-gray-500 border-gray-200',
  }
  return cores[classificacao]
}

/**
 * Retorna o label da frequência
 */
export function labelFrequencia(frequencia: string): string {
  const labels: Record<string, string> = {
    diario: 'Diário',
    semanal: 'Semanal',
    quinzenal: 'Quinzenal',
    mensal: 'Mensal',
  }
  return labels[frequencia] ?? frequencia
}

/**
 * Retorna o label da dificuldade de abastecimento
 */
export function labelDificuldade(dificuldade: string): string {
  const labels: Record<string, string> = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta',
  }
  return labels[dificuldade] ?? dificuldade
}

/**
 * Retorna a cor da badge de dificuldade
 */
export function corDificuldade(dificuldade: string): string {
  const cores: Record<string, string> = {
    baixa: 'bg-green-100 text-green-700',
    media: 'bg-amber-100 text-amber-700',
    alta: 'bg-red-100 text-red-700',
  }
  return cores[dificuldade] ?? 'bg-gray-100 text-gray-600'
}

/**
 * Formata data para pt-BR
 */
export function formatarData(data: Date | string): string {
  return new Date(data).toLocaleDateString('pt-BR')
}

/**
 * Formata moeda BRL
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}
