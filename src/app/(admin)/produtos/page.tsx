'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/BadgeOportunidade'
import { Produto } from '@/types'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

  const fetch_ = async () => {
    const res = await fetch('/api/produtos')
    setProdutos(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetch_() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir este produto?')) return
    await fetch(`/api/produtos/${id}`, { method: 'DELETE' })
    fetch_()
  }

  const columns = [
    { key: 'nome', label: 'Produto', sortable: true, render: (row: Produto) => <span className="font-medium text-gray-900">{row.nome}</span> },
    { key: 'categoria', label: 'Categoria', sortable: true, render: (row: Produto) => <span>{row.categoria?.nome ?? '—'}</span> },
    { key: 'unidadeMedida', label: 'Unidade', render: (row: Produto) => <Badge label={row.unidadeMedida} /> },
    { key: 'perecivel', label: 'Perecível', render: (row: Produto) => <Badge label={row.perecivel ? 'Sim' : 'Não'} variant={row.perecivel ? 'warning' : 'default'} /> },
    { key: 'ativo', label: 'Status', render: (row: Produto) => <Badge label={row.ativo ? 'Ativo' : 'Inativo'} variant={row.ativo ? 'success' : 'default'} /> },
    {
      key: 'acoes', label: 'Ações',
      render: (row: Produto) => (
        <div className="flex gap-2">
          <Link href={`/produtos/${row.id}/editar`} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"><Pencil className="w-4 h-4" /></Link>
          <button onClick={() => handleDelete(row.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Header title="Produtos" subtitle="Catálogo de produtos mapeados" />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Link href="/produtos/novo" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> Novo Produto
          </Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : (
          <DataTable data={produtos} columns={columns} searchable searchKeys={['nome']} emptyMessage="Nenhum produto cadastrado." />
        )}
      </div>
    </div>
  )
}
