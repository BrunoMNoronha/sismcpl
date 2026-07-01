'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { CardIndicador } from '@/components/CardIndicador'
import { BadgeOportunidade } from '@/components/BadgeOportunidade'
import { Store, Users, Package, Map, TrendingDown, BarChart3, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ClassificacaoOportunidade } from '@/types'

interface DashboardData {
  totalComercios: number
  totalProdutores: number
  totalProdutos: number
  totalVisitas: number
  totalDemandas: number
  totalCapacidades: number
  produtosMaisDemandados: { produto: string; totalMensal: number; unidade: string }[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [oportunidades, setOportunidades] = useState<{ produto: string; classificacao: ClassificacaoOportunidade }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard').then(r => r.json()),
      fetch('/api/oportunidades').then(r => r.json()),
    ]).then(([dash, ops]) => {
      setData(dash)
      setOportunidades(ops.slice(0, 5))
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div>
        <Header title="Dashboard" subtitle="Visão geral do sistema" />
        <div className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-24 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header title="Dashboard" subtitle="Visão geral do mapeamento comercial e produtivo" />
      <div className="p-6 space-y-6">
        {/* Cards Indicadores */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <CardIndicador titulo="Comércios Cadastrados" valor={data?.totalComercios ?? 0} icon={Store} cor="emerald" descricao="estabelecimentos mapeados" />
          <CardIndicador titulo="Produtores Cadastrados" valor={data?.totalProdutores ?? 0} icon={Users} cor="blue" descricao="produtores rurais" />
          <CardIndicador titulo="Produtos Mapeados" valor={data?.totalProdutos ?? 0} icon={Package} cor="purple" descricao="itens no catálogo" />
          <CardIndicador titulo="Visitas Realizadas" valor={data?.totalVisitas ?? 0} icon={Map} cor="amber" descricao="visitas de campo" />
          <CardIndicador titulo="Demandas Comerciais" valor={data?.totalDemandas ?? 0} icon={TrendingDown} cor="rose" descricao="registros de demanda" />
          <CardIndicador titulo="Capacidades Produtivas" valor={data?.totalCapacidades ?? 0} icon={BarChart3} cor="emerald" descricao="registros de produção" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Produtos Mais Demandados */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Produtos Mais Demandados</h2>
                <p className="text-xs text-gray-500 mt-0.5">Quantidade mensal estimada</p>
              </div>
              <TrendingDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="p-5 space-y-3">
              {data?.produtosMaisDemandados.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Nenhuma demanda registrada ainda.</p>
              ) : (
                data?.produtosMaisDemandados.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">{p.produto}</span>
                        <span className="text-sm text-gray-500">{p.totalMensal} {p.unidade}/mês</span>
                      </div>
                      <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, (p.totalMensal / (data?.produtosMaisDemandados[0]?.totalMensal || 1)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Oportunidades em Destaque */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Oportunidades em Destaque</h2>
                <p className="text-xs text-gray-500 mt-0.5">Cruzamento de demanda e oferta</p>
              </div>
              <Lightbulb className="w-4 h-4 text-amber-400" />
            </div>
            <div className="p-5 space-y-3">
              {oportunidades.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Nenhuma oportunidade mapeada ainda.</p>
              ) : (
                oportunidades.map((op, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{op.produto}</span>
                    <BadgeOportunidade classificacao={op.classificacao} />
                  </div>
                ))
              )}
            </div>
            <div className="px-5 py-3 border-t border-gray-100">
              <Link href="/oportunidades" className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Ver todas as oportunidades <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Acesso Rápido */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-xl p-5 text-white">
          <h2 className="font-semibold mb-1">Acesso Rápido</h2>
          <p className="text-emerald-200 text-sm mb-4">Cadastre novos dados para enriquecer o mapeamento</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/comercios/novo', label: '+ Comércio' },
              { href: '/produtores/novo', label: '+ Produtor' },
              { href: '/demandas/novo', label: '+ Demanda' },
              { href: '/capacidades/novo', label: '+ Capacidade' },
              { href: '/visitas/novo', label: '+ Visita' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
