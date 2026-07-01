import Link from 'next/link'
import { Sprout, Store, Users, Package, BarChart3, Lightbulb, ArrowRight, Map, TrendingUp, CheckCircle, Play } from 'lucide-react'

const features = [
  {
    icon: Store,
    title: 'Comércios Locais',
    desc: 'Cadastre e mapeie os estabelecimentos comerciais da comunidade, suas necessidades e interesse em comprar localmente.',
  },
  {
    icon: Users,
    title: 'Produtores Rurais',
    desc: 'Registre produtores, suas propriedades, capacidade produtiva e interesse em vender para o comércio local.',
  },
  {
    icon: TrendingUp,
    title: 'Demandas Comerciais',
    desc: 'Mapeie o que cada comércio precisa comprar: produto, quantidade, frequência e dificuldade de abastecimento.',
  },
  {
    icon: BarChart3,
    title: 'Capacidade Produtiva',
    desc: 'Registre o que cada produtor produz hoje e o que poderia produzir com apoio e incentivo adequado.',
  },
  {
    icon: Map,
    title: 'Visitas de Campo',
    desc: 'Organize e registre as visitas a comércios e produtores, com pendências, observações e datas de retorno.',
  },
  {
    icon: Lightbulb,
    title: 'Relatório de Oportunidades',
    desc: 'Cruzamento automático de demanda e oferta local para identificar produtos com alto potencial produtivo.',
  },
]

const diferenciais = [
  'Cruza demanda e oferta local automaticamente',
  'Classifica oportunidades produtivas por prioridade',
  'Mapeamento de produtores e comércios em uma só plataforma',
  'Registro de visitas de campo com pendências',
  'Dashboard com indicadores em tempo real',
  'Preparado para exportação e uso offline futuro',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-emerald-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-400 rounded-xl flex items-center justify-center">
              <Sprout className="w-5 h-5 text-emerald-900" />
            </div>
            <div>
              <p className="font-bold text-sm">SisMCPL</p>
              <p className="text-emerald-400 text-xs">Mapeamento Comercial e Produtivo Local</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Acessar Painel <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/60 px-4 py-2 rounded-full text-emerald-300 text-sm mb-6">
            <Sprout className="w-4 h-4" />
            Desenvolvimento Produtivo Local
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            O sistema que transforma
            <span className="text-emerald-400"> informação dispersa </span>
            em decisão produtiva local
          </h1>
          <p className="text-xl text-emerald-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            SisMCPL conecta comércios locais e produtores rurais, mapeando demandas reais e
            capacidades produtivas para identificar oportunidades que fortalecem a economia da comunidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-emerald-900/50"
            >
              Acessar o Painel <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#sobre"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-colors border border-white/20"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section id="sobre" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                O problema que o SisMCPL resolve
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Em muitas comunidades rurais, comércios locais compram produtos de distribuidores distantes
                enquanto produtores da própria região não conseguem colocar sua produção no mercado local.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Essa desconexão acontece por falta de informação organizada: ninguém sabe exatamente
                o que o comércio precisa, o que o produtor tem disponível e onde estão as oportunidades reais.
              </p>
              <p className="text-gray-700 font-medium">
                O SisMCPL mapeia essa realidade e entrega respostas concretas para agentes de desenvolvimento local.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Comércios mapeados', val: '✓', desc: 'com demandas reais' },
                { label: 'Produtores conectados', val: '✓', desc: 'com capacidade real' },
                { label: 'Oportunidades identificadas', val: '✓', desc: 'automaticamente' },
                { label: 'Visitas registradas', val: '✓', desc: 'com histórico completo' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <p className="text-2xl font-bold text-emerald-600 mb-1">{item.val}</p>
                  <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Funcionalidades Principais</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Um conjunto completo de ferramentas para mapear, registrar e analisar o potencial produtivo local.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-emerald-100 group-hover:bg-emerald-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-emerald-950 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Por que usar o SisMCPL?</h2>
              <p className="text-emerald-200 mb-8 leading-relaxed">
                Desenvolvido especialmente para agentes de desenvolvimento local, extensionistas rurais
                e gestores de programas de compras institucionais e economia solidária.
              </p>
              <ul className="space-y-3">
                {diferenciais.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-emerald-100 text-sm">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-800/40 rounded-2xl p-8 border border-emerald-700">
              {/* Área de mídia */}
              <div className="bg-emerald-900/60 rounded-xl aspect-video flex flex-col items-center justify-center border border-emerald-700 border-dashed mb-4">
                <Play className="w-12 h-12 text-emerald-400 mb-3" />
                <p className="text-emerald-300 text-sm font-medium">Impacto do SisMCPL</p>
                <p className="text-emerald-500 text-xs mt-1">Adicione o vídeo em public/media/Impacto_do_SisMCPL.mp4</p>
              </div>
              {/* Áudio */}
              <div className="bg-emerald-900/40 rounded-lg p-4 border border-emerald-700">
                <p className="text-emerald-300 text-xs font-medium mb-1">🎵 Tecnologia para unir produtores e mercados locais</p>
                <p className="text-emerald-500 text-xs">Adicione o áudio em public/media/Tecnologia_para_unir_produtores_e_mercados_locais.m4a</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Público-alvo */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Para quem é o SisMCPL?</h2>
          <p className="text-gray-500 mb-8">Feito para quem trabalha com desenvolvimento territorial e economia local.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Extensionistas rurais',
              'Agentes de ATER',
              'Gestores municipais',
              'Técnicos de EMATER',
              'Coordenadores do PAA e PNAE',
              'Organizações sociais',
              'Cooperativas',
              'Pesquisadores locais',
            ].map((p, i) => (
              <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comece a mapear sua comunidade agora
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Acesse o painel e comece a cadastrar comércios, produtores e demandas.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            Ir para o Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sprout className="w-4 h-4 text-emerald-500" />
            <span className="text-white font-semibold text-sm">SisMCPL</span>
          </div>
          <p className="text-xs">Sistema de Mapeamento Comercial e Produtivo Local</p>
          <p className="text-xs mt-1">Transformando informação dispersa em decisão produtiva local.</p>
        </div>
      </footer>
    </div>
  )
}
