'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/BadgeOportunidade'
import { Produtor } from '@/types'
import { Plus, Pencil, Trash2, Phone, MapPin } from 'lucide-react'

export default function ProdutoresPage() {
  const [produtores, setProdutores] = useState<Produtor[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProdutores = async () => {
    const res = await fetch('/api/produtores')
    setProdutores(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchProdutores() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja excluir este produtor?')) return
    await fetch(`/api/produtores/${id}`, { method: 'DELETE' })
    fetchProdutores()
  }

  const columns = [
    {
      key: 'nome', label: 'Produtor', sortable: true,
      render: (row: Produtor) => (
        <div>
          <p className="font-medium text-gray-900">{row.nome}</p>
          {row.nomePropriedade && <p className="text-xs text-gray-500">{row.nomePropriedade}</p>}
        </div>
      ),
    },
    { key: 'telefone', label: 'Telefone', render: (row: Produtor) => (<div className="flex items-center gap-1 text-gray-600"><Phone className="w-3 h-3" /><span>{row.telefone}</span></div>) },
    { key: 'localidade', label: 'Localidade', sortable: true, render: (row: Produtor) => (<div className="flex items-center gap-1 text-gray-600"><MapPin className="w-3 h-3" /><span>{row.localidade}</span></div>) },
    { key: 'tipoPropriedade', label: 'Tipo', render: (row: Produtor) => row.tipoPropriedade ? <Badge label={row.tipoPropriedade} /> : <span className="text-gray-400">—</span> },
    { key: 'interesseVenderLocal', label: 'Interesse Local', render: (row: Produtor) => <Badge label={row.interesseVenderLocal ? 'Sim' : 'Não'} variant={row.interesseVenderLocal ? 'success' : 'default'} /> },
    { key: 'possuiDocumentacaoVenda', label: 'Documentação', render: (row: Produtor) => <Badge label={row.possuiDocumentacaoVenda ? 'OK' : 'Pendente'} variant={row.possuiDocumentacaoVenda ? 'success' : 'warning'} /> },
    {
      key: 'acoes', label: 'Ações',
      render: (row: Produtor) => (
        <div className="flex items-center gap-2">
          <Link href={`/produtores/${row.id}/editar`} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"><Pencil className="w-4 h-4" /></Link>
          <button onClick={() => handleDelete(row.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Header title="Produtores" subtitle="Produtores rurais mapeados" />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Link href="/produtores/novo" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> Novo Produtor
          </Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : (
          <DataTable data={produtores} columns={columns} searchable searchKeys={['nome', 'localidade', 'nomePropriedade']} emptyMessage="Nenhum produtor cadastrado ainda." />
        )}
      </div>
    </div>
  )
}
