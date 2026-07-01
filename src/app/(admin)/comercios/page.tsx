'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { DataTable } from '@/components/DataTable'
import { Badge } from '@/components/BadgeOportunidade'
import { Comercio } from '@/types'
import { Plus, Pencil, Trash2, Phone, MapPin } from 'lucide-react'

export default function ComerciosPage() {
  const [comercios, setComercios] = useState<Comercio[]>([])
  const [loading, setLoading] = useState(true)

  const fetchComercios = async () => {
    const res = await fetch('/api/comercios')
    const data = await res.json()
    setComercios(data)
    setLoading(false)
  }

  useEffect(() => { fetchComercios() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja excluir este comércio?')) return
    await fetch(`/api/comercios/${id}`, { method: 'DELETE' })
    fetchComercios()
  }

  const columns = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true,
      render: (row: Comercio) => (
        <div>
          <p className="font-medium text-gray-900">{row.nome}</p>
          <p className="text-xs text-gray-500">{row.responsavel}</p>
        </div>
      ),
    },
    { key: 'tipo', label: 'Tipo', sortable: true },
    {
      key: 'telefone',
      label: 'Telefone',
      render: (row: Comercio) => (
        <div className="flex items-center gap-1 text-gray-600">
          <Phone className="w-3 h-3" />
          <span>{row.telefone}</span>
        </div>
      ),
    },
    {
      key: 'bairro',
      label: 'Localização',
      render: (row: Comercio) => row.bairro ? (
        <div className="flex items-center gap-1 text-gray-600">
          <MapPin className="w-3 h-3" />
          <span>{row.bairro}</span>
        </div>
      ) : <span className="text-gray-400">—</span>,
    },
    {
      key: 'interesseEmComprarLocal',
      label: 'Interesse Local',
      render: (row: Comercio) => (
        <Badge
          label={row.interesseEmComprarLocal ? 'Sim' : 'Não'}
          variant={row.interesseEmComprarLocal ? 'success' : 'default'}
        />
      ),
    },
    {
      key: 'ativo',
      label: 'Status',
      render: (row: Comercio) => (
        <Badge label={row.ativo ? 'Ativo' : 'Inativo'} variant={row.ativo ? 'success' : 'default'} />
      ),
    },
    {
      key: 'acoes',
      label: 'Ações',
      render: (row: Comercio) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/comercios/${row.id}/editar`}
            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Header title="Comércios" subtitle="Estabelecimentos comerciais mapeados" />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <Link
            href="/comercios/novo"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Novo Comércio
          </Link>
        </div>
        {loading ? (
          <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : (
          <DataTable
            data={comercios}
            columns={columns}
            searchable
            searchKeys={['nome', 'responsavel', 'tipo', 'bairro']}
            emptyMessage="Nenhum comércio cadastrado ainda. Clique em 'Novo Comércio' para começar."
          />
        )}
      </div>
    </div>
  )
}
