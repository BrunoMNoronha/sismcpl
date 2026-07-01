'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/BadgeOportunidade'
import { CapacidadeProdutiva } from '@/types'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { labelFrequencia } from '@/utils'

export default function CapacidadesPage() {
  const [capacidades, setCapacidades] = useState<CapacidadeProdutiva[]>([])
  const [loading, setLoading] = useState(true)

  const fetch_ = async () => {
    const res = await fetch('/api/capacidades')
    setCapacidades(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetch_() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir esta capacidade produtiva?')) return
    await fetch(`/api/capacidades/${id}`, { method: 'DELETE' })
    fetch_()
  }

  const columns = [
    { key: 'produto', label: 'Produto', sortable: true, render: (row: CapacidadeProdutiva) => (
      <div><p className="font-medium text-gray-900">{row.produto?.nome ?? '—'}</p><p className="text-xs text-gray-500">{row.produto?.categoria?.nome}</p></div>
    )},
    { key: 'produtor', label: 'Produtor', render: (row: CapacidadeProdutiva) => <span>{row.produtor?.nome ?? '—'}</span> },
    { key: 'quantidadeMensalEstimada', label: 'Qtd Mensal', render: (row: CapacidadeProdutiva) => <span>{row.quantidadeMensalEstimada ?? 0} {row.unidadeMedida}/mês</span> },
    { key: 'frequencia', label: 'Frequência', render: (row: CapacidadeProdutiva) => <Badge label={labelFrequencia(row.frequencia)} /> },
    { key: 'produzAtualmente', label: 'Produz Hoje', render: (row: CapacidadeProdutiva) => <Badge label={row.produzAtualmente ? 'Sim' : 'Não'} variant={row.produzAtualmente ? 'success' : 'default'} /> },
    { key: 'poderiaProdzir', label: 'Pode Ampliar', render: (row: CapacidadeProdutiva) => <Badge label={row.poderiaProdzir ? 'Sim' : 'Não'} variant={row.poderiaProdzir ? 'info' : 'default'} /> },
    { key: 'acoes', label: 'Ações', render: (row: CapacidadeProdutiva) => (
      <div className="flex gap-2">
        <Link href={`/capacidades/${row.id}/editar`} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"><Pencil className="w-4 h-4" /></Link>
        <button onClick={() => handleDelete(row.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ]

  return (
    <div>
      <Header title="Capacidades Produtivas" subtitle="O que os produtores podem oferecer" />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Link href="/capacidades/novo" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"><Plus className="w-4 h-4" /> Nova Capacidade</Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : (
          <DataTable data={capacidades} columns={columns} emptyMessage="Nenhuma capacidade produtiva registrada ainda." />
        )}
      </div>
    </div>
  )
}
