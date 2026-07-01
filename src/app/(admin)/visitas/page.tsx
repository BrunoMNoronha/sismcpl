'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/BadgeOportunidade'
import { VisitaCampo } from '@/types'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { formatarData } from '@/utils'

export default function VisitasPage() {
  const [visitas, setVisitas] = useState<VisitaCampo[]>([])
  const [loading, setLoading] = useState(true)

  const fetch_ = async () => {
    const res = await fetch('/api/visitas')
    setVisitas(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetch_() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir esta visita?')) return
    await fetch(`/api/visitas/${id}`, { method: 'DELETE' })
    fetch_()
  }

  const columns = [
    { key: 'dataVisita', label: 'Data', sortable: true, render: (row: VisitaCampo) => <span>{formatarData(row.dataVisita)}</span> },
    { key: 'tipoVisitado', label: 'Tipo', render: (row: VisitaCampo) => <Badge label={row.tipoVisitado === 'comercio' ? 'Comércio' : 'Produtor'} variant={row.tipoVisitado === 'comercio' ? 'info' : 'success'} /> },
    { key: 'visitado', label: 'Visitado', render: (row: VisitaCampo) => (
      <span className="font-medium">{row.comercio?.nome ?? row.produtor?.nome ?? '—'}</span>
    )},
    { key: 'agenteResponsavel', label: 'Agente', sortable: true },
    { key: 'precisaRetorno', label: 'Retorno', render: (row: VisitaCampo) => (
      <div>
        <Badge label={row.precisaRetorno ? 'Pendente' : 'OK'} variant={row.precisaRetorno ? 'warning' : 'success'} />
        {row.precisaRetorno && row.dataRetornoSugerida && (
          <p className="text-xs text-gray-500 mt-0.5">{formatarData(row.dataRetornoSugerida)}</p>
        )}
      </div>
    )},
    { key: 'acoes', label: 'Ações', render: (row: VisitaCampo) => (
      <div className="flex gap-2">
        <Link href={`/visitas/${row.id}/editar`} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"><Pencil className="w-4 h-4" /></Link>
        <button onClick={() => handleDelete(row.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ]

  return (
    <div>
      <Header title="Visitas de Campo" subtitle="Histórico de visitas a comércios e produtores" />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Link href="/visitas/novo" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"><Plus className="w-4 h-4" /> Nova Visita</Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : (
          <DataTable data={visitas} columns={columns} searchable searchKeys={['agenteResponsavel']} emptyMessage="Nenhuma visita registrada ainda." />
        )}
      </div>
    </div>
  )
}
