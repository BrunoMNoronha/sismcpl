'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { FormSection, FormField, Input, Select, Textarea, CheckboxField } from '@/components/FormSection'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CategoriaProduto } from '@/types'

export function ProdutoForm({ id }: { id?: number }) {
  const router = useRouter()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [categorias, setCategorias] = useState<CategoriaProduto[]>([])
  const [form, setForm] = useState({ nome: '', categoriaId: '', unidadeMedida: 'kg', perecivel: false, ativo: true, observacoes: '' })

  useEffect(() => {
    fetch('/api/categorias').then(r => r.json()).then(setCategorias)
    if (id) fetch(`/api/produtos/${id}`).then(r => r.json()).then(data => setForm({ ...data, categoriaId: String(data.categoriaId) }))
  }, [id])

  const set = (field: string, value: unknown) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.categoriaId || !form.unidadeMedida) { alert('Preencha os campos obrigatórios.'); return }
    setLoading(true)
    const payload = { ...form, categoriaId: Number(form.categoriaId) }
    const url = isEditing ? `/api/produtos/${id}` : '/api/produtos'
    await fetch(url, { method: isEditing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    router.push('/produtos')
  }

  return (
    <div>
      <Header title={isEditing ? 'Editar Produto' : 'Novo Produto'} />
      <div className="p-6">
        <Link href="/produtos" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-5"><ArrowLeft className="w-4 h-4" /> Voltar</Link>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <FormSection titulo="Dados do Produto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Nome do Produto" required><Input value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Tomate" required /></FormField>
              <FormField label="Categoria" required>
                <Select value={form.categoriaId} onChange={e => set('categoriaId', e.target.value)} required>
                  <option value="">Selecione...</option>
                  {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </Select>
              </FormField>
              <FormField label="Unidade de Medida" required>
                <Select value={form.unidadeMedida} onChange={e => set('unidadeMedida', e.target.value)} required>
                  {['kg', 'unidade', 'litro', 'caixa', 'dúzia', 'saco', 'maço', 'bandeja', 'fardo'].map(u => <option key={u} value={u}>{u}</option>)}
                </Select>
              </FormField>
            </div>
            <div className="mt-4 space-y-2">
              <CheckboxField label="Produto perecível" checked={form.perecivel} onChange={v => set('perecivel', v)} />
              {isEditing && <CheckboxField label="Produto ativo" checked={form.ativo} onChange={v => set('ativo', v)} />}
            </div>
          </FormSection>
          <FormSection titulo="Observações">
            <Textarea value={form.observacoes} onChange={e => set('observacoes', e.target.value)} placeholder="Informações adicionais..." />
          </FormSection>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60"><Save className="w-4 h-4" />{loading ? 'Salvando...' : 'Salvar Produto'}</button>
            <Link href="/produtos" className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
