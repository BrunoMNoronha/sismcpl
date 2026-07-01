'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Search } from 'lucide-react'

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  emptyMessage?: string
  searchable?: boolean
  searchKeys?: (keyof T)[]
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  emptyMessage = 'Nenhum registro encontrado.',
  searchable = false,
  searchKeys = [],
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [search, setSearch] = useState('')

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filtered = searchable && search
    ? data.filter((row) =>
        searchKeys.some((key) => {
          const val = (row as Record<string, unknown>)[key as string]
          return String(val ?? '').toLowerCase().includes(search.toLowerCase())
        })
      )
    : data

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortKey]
        const bVal = (b as Record<string, unknown>)[sortKey]
        const dir = sortDir === 'asc' ? 1 : -1
        if (aVal === null || aVal === undefined) return dir
        if (bVal === null || bVal === undefined) return -dir
        return String(aVal).localeCompare(String(bVal), 'pt-BR') * dir
      })
    : filtered

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {searchable && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide ${
                    col.sortable ? 'cursor-pointer select-none hover:text-gray-900' : ''
                  }`}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === String(col.key) && (
                      sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-gray-400 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sorted.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    i % 2 === 0 ? '' : 'bg-gray-50/50'
                  }`}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-700">
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[String(col.key)] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {sorted.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
          {sorted.length} registro{sorted.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
