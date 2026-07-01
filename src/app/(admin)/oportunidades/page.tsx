'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { BadgeOportunidade } from '@/components/BadgeOportunidade'
import { OportunidadeProduto } from '@/types'
import { labelDificuldade, corDificuldade } from '@/utils'
import { Lightbulb, TrendingUp, TrendingDown, Users, Store } from 'lucide-react'

export default function OportunidadesPage() {
  const [oportunidades, setOportunidades] = useState<OportunidadeProduto[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState<string>('todos')

  useEffect(() => {
    fetch('/api/oportunidades')
      .then(r => r.json())
      .then(data => { setOportunidades(data); setLoading(false) })
  }, [])

  const filtradas = filtro === 'todos'
    ? oportunidades
    : oportunidades.filter(op => op.classificacao === filtro)

  const totais = {
    alta: oportunidades.filter(o => o.classificacao === 'alta').length,
    media: oportunidades.filter(o => o.classificacao === 'media').length,
    baixa: oportunidades.filter(o => o.classificacao === 'baixa').length,
    sem_dados: oportunidades.filter(o => o.classificacao === 'sem_dados').length,
  }

  return (
    <div>
      <Header title="Relatório de Oportunidades" subtitle="Cruzamento de demanda comercial e oferta produtiva local" />
      <div className="p-6 space-y-6">

        {/* Resumo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Alta Oportunidade', count: totais.alta, color: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'bg-emerald-500', key: 'alta' },
            { label: 'Média Oportunidade', count: totais.media, color: 'bg-amber-50 border-amber-200 text-amber-700', dot: 'bg-amber-400', key: 'media' },
            { label: 'Baixa Oportunidade', count: totais.baixa, color: 'bg-slate-50 border-slate-200 text-slate-600', dot: 'bg-slate-400', key: 'baixa' },
            { label: 'Sem Dados', count: totais.sem_dados, color: 'bg-gray-50 border-gray-200 text-gray-500', dot: 'bg-gray-300', key: 'sem_dados' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFiltro(filtro === item.key ? 'todos' : item.key)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${item.color} ${filtro === item.key ? 'ring-2 ring-offset-2 ring-emerald-400' : 'hover:shadow-sm'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                <p className="text-xs font-medium">{item.label}</p>
              </div>
              <p className="text-2xl font-bold">{item.count}</p>
              <p className="text-xs opacity-70 mt-0.5">produto{item.count !== 1 ? 's' : ''}</p>
            </button>
          ))}
        </div>

        {/* Filtro ativo */}
        {filtro !== 'todos' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filtrando por:</span>
            <BadgeOportunidade classificacao={filtro as OportunidadeProduto['classificacao']} />
            <button onClick={() => setFiltro('todos')} className="text-xs text-gray-400 hover:text-gray-600 underline">limpar</button>
          </div>
        )}

        {/* Tabela */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h2 className="font-semibold text-gray-900">Produtos com Oportunidade Produtiva Local</h2>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : filtradas.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Lightbulb className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhuma oportunidade encontrada para o filtro selecionado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Produto</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Demanda Mensal</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Oferta Local</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Origem Atual</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Comércios</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Produtores</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Dificuldade</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Classificação</th>
                  </tr>
                </thead>
                <tbody>
                  {filtradas.map((op, i) => (
                    <tr
                      key={op.produtoId}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 text-sm">{op.produto}</p>
                        <p className="text-xs text-gray-400">{op.categoria}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <TrendingDown className="w-3 h-3 text-red-400" />
                          <span className="text-sm font-medium text-gray-800">
                            {op.demandaMensalEstimada > 0 ? `${op.demandaMensalEstimada} ${op.unidadeMedida}/mês` : '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                          <span className="text-sm text-gray-700">
                            {op.ofertaLocalEstimada > 0 ? `${op.ofertaLocalEstimada} ${op.unidadeMedida}/mês` : <span className="text-gray-400">Sem oferta</span>}
                          </span>
                        </div>
                        {op.ofertaPotencialEstimada > 0 && (
                          <p className="text-xs text-blue-500 mt-0.5">+{op.ofertaPotencialEstimada} potencial</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 capitalize">{op.origemAtualPredominante}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Store className="w-3 h-3 text-blue-400" />
                          <span className="text-sm text-gray-700">{op.comerciosInteressados}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3 h-3 text-emerald-500" />
                          <span className="text-sm text-gray-700">{op.produtoresAptos}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${corDificuldade(op.dificuldadeAbastecimento)}`}>
                          {labelDificuldade(op.dificuldadeAbastecimento)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <BadgeOportunidade classificacao={op.classificacao} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtradas.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
              {filtradas.length} produto{filtradas.length !== 1 ? 's' : ''} listado{filtradas.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Metodologia */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-emerald-800 mb-2">📌 Metodologia de Classificação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-emerald-700">
            <div>
              <strong>🟢 Alta:</strong> Demanda {'>'} oferta local, compra de fora, dificuldade alta/média e produtor apto.
            </div>
            <div>
              <strong>🟡 Média:</strong> Demanda existente com alguma oferta ou potencial produtivo.
            </div>
            <div>
              <strong>⚪ Baixa:</strong> Oferta local suficiente ou baixa demanda comercial.
            </div>
            <div>
              <strong>🔘 Sem dados:</strong> Dados insuficientes de demanda ou produção para análise.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
