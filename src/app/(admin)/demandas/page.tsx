'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/BadgeOportunidade'
import { DemandaComercial } from '@/types'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { labelFrequencia, labelDificuldade, corDificuldade } from '@/utils'

export default function DemandasPage() {
  const [demandas, setDemandas] = useState<DemandaComercial[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDemandas = async () => {
    const res = await fetch('/api/demandas')
    setDemandas(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchDemandas() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir esta demanda?')) return
    await fetch(`/api/demandas/${id}`, { method: 'DELETE' })
    fetchDemandas()
  }

  const columns = [
    { key: 'produto', label: 'Produto', sortable: true, render: (row: DemandaComercial) => (
      <div>
        <p className="font-medium text-gray-900">{row.produto?.nome ?? '—'}</p>
        <p className="text-xs text-gray-500">{row.produto?.categoria?.nome}</p>
      </div>
    )},
    { key: 'comercio', label: 'Comércio', render: (row: DemandaComercial) => <span>{row.comercio?.nome ?? '—'}</span> },
    { key: 'quantidadeMensalEstimada', label: 'Qtd Mensal', render: (row: DemandaComercial) => (
      <span>{row.quantidadeMensalEstimada ?? 0} {row.unidadeMedida}/mês</span>
    )},
    { key: 'frequencia', label: 'Frequência', render: (row: DemandaComercial) => <Badge label={labelFrequencia(row.frequencia)} /> },
    { key: 'origemAtual', label: 'Origem', render: (row: DemandaComercial) => row.origemAtual ? <Badge label={row.origemAtual} /> : <span className="text-gray-400">—</span> },
    { key: 'dificuldadeAbastecimento', label: 'Dificuldade', render: (row: DemandaComercial) => (
      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${corDificuldade(row.dificuldadeAbastecimento)}`}>
        {labelDificuldade(row.dificuldadeAbastecimento)}
      </span>
    )},
    { key: 'acoes', label: 'Ações', render: (row: DemandaComercial) => (
      <div className="flex gap-2">
        <Link href={`/demandas/${row.id}/editar`} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"><Pencil className="w-4 h-4" /></Link>
        <button onClick={() => handleDelete(row.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ]

  return (
    <div>
      <Header title="Demandas Comerciais" subtitle="O que os comércios precisam comprar" />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Link href="/demandas/novo" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> Nova Demanda
          </Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : (
          <DataTable data={demandas} columns={columns} searchable searchKeys={['origemAtual']} emptyMessage="Nenhuma demanda registrada ainda." />
        )}
      </div>
    </div>
  )
}
