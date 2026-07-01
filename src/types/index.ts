// Tipos principais do SisMCPL

export type Frequencia = 'diario' | 'semanal' | 'quinzenal' | 'mensal'
export type DificuldadeAbastecimento = 'baixa' | 'media' | 'alta'
export type ClassificacaoOportunidade = 'alta' | 'media' | 'baixa' | 'sem_dados'
export type TipoVisitado = 'comercio' | 'produtor'
export type Porte = 'micro' | 'pequeno' | 'medio' | 'grande'
export type TipoPropriedade = 'familiar' | 'comercial' | 'assentamento'
export type OrigemAtual = 'local' | 'regional' | 'estadual' | 'nacional'

export interface CategoriaProduto {
  id: number
  nome: string
  descricao?: string | null
  ativo: boolean
  criadoEm: Date
}

export interface Produto {
  id: number
  nome: string
  categoriaId: number
  unidadeMedida: string
  perecivel: boolean
  ativo: boolean
  observacoes?: string | null
  criadoEm: Date
  atualizadoEm: Date
  categoria?: CategoriaProduto
}

export interface Comercio {
  id: number
  nome: string
  responsavel: string
  tipo: string
  telefone: string
  endereco?: string | null
  bairro?: string | null
  latitude?: number | null
  longitude?: number | null
  porte?: string | null
  compraDeProdutoresLocais: boolean
  interesseEmComprarLocal: boolean
  observacoes?: string | null
  ativo: boolean
  criadoEm: Date
  atualizadoEm: Date
}

export interface Produtor {
  id: number
  nome: string
  nomePropriedade?: string | null
  telefone: string
  documento?: string | null
  localidade: string
  tamanhoPropriedade?: number | null
  tipoPropriedade?: string | null
  latitude?: number | null
  longitude?: number | null
  possuiTransporte: boolean
  possuiIrrigacao: boolean
  possuiAgua: boolean
  possuiMaoDeObra: boolean
  possuiDocumentacaoVenda: boolean
  interesseVenderLocal: boolean
  observacoes?: string | null
  ativo: boolean
  criadoEm: Date
  atualizadoEm: Date
}

export interface DemandaComercial {
  id: number
  comercioId: number
  produtoId: number
  quantidade: number
  unidadeMedida: string
  frequencia: string
  quantidadeMensalEstimada?: number | null
  precoMedioPago?: number | null
  origemAtual?: string | null
  dificuldadeAbastecimento: string
  aceitaFornecedorLocal: boolean
  precisaDeEntrega: boolean
  precisaDeNotaFiscal: boolean
  requisitos?: string | null
  observacoes?: string | null
  criadoEm: Date
  atualizadoEm: Date
  comercio?: Comercio
  produto?: Produto
}

export interface CapacidadeProdutiva {
  id: number
  produtorId: number
  produtoId: number
  produzAtualmente: boolean
  poderiaProdzir: boolean
  quantidade: number
  unidadeMedida: string
  frequencia: string
  quantidadeMensalEstimada?: number | null
  sazonalidade?: string | null
  limitacoes?: string | null
  necessidadeApoio?: string | null
  observacoes?: string | null
  criadoEm: Date
  atualizadoEm: Date
  produtor?: Produtor
  produto?: Produto
}

export interface VisitaCampo {
  id: number
  tipoVisitado: string
  comercioId?: number | null
  produtorId?: number | null
  dataVisita: Date
  agenteResponsavel: string
  observacoes?: string | null
  pendencias?: string | null
  precisaRetorno: boolean
  dataRetornoSugerida?: Date | null
  usuarioId?: number | null
  criadoEm: Date
  atualizadoEm: Date
  comercio?: Comercio
  produtor?: Produtor
}

export interface OportunidadeProduto {
  produtoId: number
  produto: string
  categoria: string
  unidadeMedida: string
  demandaMensalEstimada: number
  ofertaLocalEstimada: number
  ofertaPotencialEstimada: number
  origemAtualPredominante: string
  comerciosInteressados: number
  produtoresAptos: number
  dificuldadeAbastecimento: string
  classificacao: ClassificacaoOportunidade
}

export interface DashboardData {
  totalComercios: number
  totalProdutores: number
  totalProdutos: number
  totalVisitas: number
  totalDemandas: number
  totalCapacidades: number
  produtosMaisDemandados: { produto: string; totalMensal: number }[]
  oportunidadesAltas: number
}
