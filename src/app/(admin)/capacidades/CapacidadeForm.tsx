'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { FormSection, FormField, Input, Select, Textarea, CheckboxField } from '@/components/FormSection'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Produtor, Produto } from '@/types'

export function CapacidadeForm({ id }: { id?: number }) {
  const router = useRouter()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [produtores, setProdutores] = useState<Produtor[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [form, setForm] = useState({
    produtorId: '', produtoId: '', produzAtualmente: true, poderiaProdzir: false,
    quantidade: '', unidadeMedida: 'kg', frequencia: 'semanal',
    sazonalidade: '', limitacoes: '', necessidadeApoio: '', observacoes: '',
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/produtores').then(r => r.json()),
      fetch('/api/produtos').then(r => r.json()),
    ]).then(([pr, pd]) => { setProdutores(pr); setProdutos(pd) })
    if (id) {
      fetch(`/api/capacidades/${id}`).then(r => r.json()).then(data => {
        setForm({ ...data, produtorId: String(data.produtorId), produtoId: String(data.produtoId), quantidade: String(data.quantidade) })
      })
    }
  }, [id])

  const set = (field: string, value: unknown) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.produtorId || !form.produtoId || !form.quantidade) { alert('Preencha os campos obrigatórios.'); return }
    if (Number(form.quantidade) <= 0) { alert('A quantidade deve ser maior que zero.'); return }
    setLoading(true)
    const payload = { ...form, produtorId: Number(form.produtorId), produtoId: Number(form.produtoId), quantidade: Number(form.quantidade) }
    const url = isEditing ? `/api/capacidades/${id}` : '/api/capacidades'
    await fetch(url, { method: isEditing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    router.push('/capacidades')
  }

  return (
    <div>
      <Header title={isEditing ? 'Editar Capacidade' : 'Nova Capacidade Produtiva'} subtitle="Registre o que o produtor produz ou pode produzir" />
      <div className="p-6">
        <Link href="/capacidades" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-5"><ArrowLeft className="w-4 h-4" /> Voltar</Link>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
          <FormSection titulo="Vínculo">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Produtor" required>
                <Select value={form.produtorId} onChange={e => set('produtorId', e.target.value)} required>
                  <option value="">Selecione o produtor...</option>
                  {produtores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </Select>
              </FormField>
              <FormField label="Produto" required>
                <Select value={form.produtoId} onChange={e => set('produtoId', e.target.value)} required>
                  <option value="">Selecione o produto...</option>
                  {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} ({p.unidadeMedida})</option>)}
                </Select>
              </FormField>
            </div>
          </FormSection>
          <FormSection titulo="Produção">
            <div className="space-y-3 mb-4">
              <CheckboxField label="Produz este produto atualmente" description="Marque se o produtor já está produzindo" checked={form.produzAtualmente} onChange={v => set('produzAtualmente', v)} />
              <CheckboxField label="Poderia ampliar ou iniciar a produção" description="Marque se há potencial com apoio" checked={form.poderiaProdzir} onChange={v => set('poderiaProdzir', v)} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField label="Quantidade" required><Input type="number" step="0.01" min="0.01" value={form.quantidade} onChange={e => set('quantidade', e.target.value)} required /></FormField>
              <FormField label="Unidade">
                <Select value={form.unidadeMedida} onChange={e => set('unidadeMedida', e.target.value)}>
                  {['kg', 'unidade', 'litro', 'caixa', 'dúzia', 'saco', 'maço'].map(u => <option key={u} value={u}>{u}</option>)}
                </Select>
              </FormField>
              <FormField label="Frequência">
                <Select value={form.frequencia} onChange={e => set('frequencia', e.target.value)}>
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="quinzenal">Quinzenal</option>
                  <option value="mensal">Mensal</option>
                </Select>
              </FormField>
            </div>
          </FormSection>
          <FormSection titulo="Detalhes e Limitações">
            <div className="space-y-3">
              <FormField label="Sazonalidade"><Input value={form.sazonalidade} onChange={e => set('sazonalidade', e.target.value)} placeholder="Ex: Maior produção no período chuvoso" /></FormField>
              <FormField label="Limitações atuais"><Textarea value={form.limitacoes} onChange={e => set('limitacoes', e.target.value)} placeholder="Ex: Falta de transporte, problemas de irrigação..." /></FormField>
              <FormField label="Necessidade de apoio"><Textarea value={form.necessidadeApoio} onChange={e => set('necessidadeApoio', e.target.value)} placeholder="Ex: Assistência técnica, microcrédito, equipamentos..." /></FormField>
              <FormField label="Observações"><Textarea value={form.observacoes} onChange={e => set('observacoes', e.target.value)} placeholder="Informações adicionais..." /></FormField>
            </div>
          </FormSection>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60"><Save className="w-4 h-4" />{loading ? 'Salvando...' : 'Salvar Capacidade'}</button>
            <Link href="/capacidades" className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
