'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { FormSection, FormField, Input, Select, Textarea, CheckboxField } from '@/components/FormSection'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Comercio, Produto } from '@/types'

export function DemandaForm({ id }: { id?: number }) {
  const router = useRouter()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [comercios, setComercios] = useState<Comercio[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [form, setForm] = useState({
    comercioId: '', produtoId: '', quantidade: '', unidadeMedida: 'kg',
    frequencia: 'semanal', precoMedioPago: '',
    origemAtual: 'regional', dificuldadeAbastecimento: 'media',
    aceitaFornecedorLocal: true, precisaDeEntrega: false,
    precisaDeNotaFiscal: false, requisitos: '', observacoes: '',
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/comercios').then(r => r.json()),
      fetch('/api/produtos').then(r => r.json()),
    ]).then(([c, p]) => { setComercios(c); setProdutos(p) })
    if (id) {
      fetch(`/api/demandas/${id}`).then(r => r.json()).then(data => {
        setForm({
          ...data,
          comercioId: String(data.comercioId),
          produtoId: String(data.produtoId),
          quantidade: String(data.quantidade),
          precoMedioPago: data.precoMedioPago != null ? String(data.precoMedioPago) : '',
        })
      })
    }
  }, [id])

  const set = (field: string, value: unknown) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.comercioId || !form.produtoId || !form.quantidade) { alert('Preencha os campos obrigatórios.'); return }
    if (Number(form.quantidade) <= 0) { alert('A quantidade deve ser maior que zero.'); return }
    setLoading(true)
    const payload = {
      ...form,
      comercioId: Number(form.comercioId),
      produtoId: Number(form.produtoId),
      quantidade: Number(form.quantidade),
      precoMedioPago: form.precoMedioPago !== '' ? Number(form.precoMedioPago) : null,
    }
    const url = isEditing ? `/api/demandas/${id}` : '/api/demandas'
    await fetch(url, { method: isEditing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    router.push('/demandas')
  }

  return (
    <div>
      <Header title={isEditing ? 'Editar Demanda' : 'Nova Demanda Comercial'} subtitle="Registre o que o comércio precisa comprar" />
      <div className="p-6">
        <Link href="/demandas" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-5"><ArrowLeft className="w-4 h-4" /> Voltar</Link>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
          <FormSection titulo="Vínculo" descricao="Campos obrigatórios">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Comércio" required>
                <Select value={form.comercioId} onChange={e => set('comercioId', e.target.value)} required>
                  <option value="">Selecione o comércio...</option>
                  {comercios.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
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
          <FormSection titulo="Quantidade e Frequência">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField label="Quantidade" required><Input type="number" step="0.01" min="0.01" value={form.quantidade} onChange={e => set('quantidade', e.target.value)} required /></FormField>
              <FormField label="Unidade">
                <Select value={form.unidadeMedida} onChange={e => set('unidadeMedida', e.target.value)}>
                  {['kg', 'unidade', 'litro', 'caixa', 'dúzia', 'saco', 'maço', 'bandeja', 'fardo'].map(u => <option key={u} value={u}>{u}</option>)}
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
              <FormField label="Preço Médio (R$)"><Input type="number" step="0.01" value={form.precoMedioPago} onChange={e => set('precoMedioPago', e.target.value)} placeholder="0,00" /></FormField>
            </div>
          </FormSection>
          <FormSection titulo="Abastecimento">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Origem Atual">
                <Select value={form.origemAtual} onChange={e => set('origemAtual', e.target.value)}>
                  <option value="local">Local</option>
                  <option value="regional">Regional</option>
                  <option value="estadual">Estadual</option>
                  <option value="nacional">Nacional</option>
                </Select>
              </FormField>
              <FormField label="Dificuldade de Abastecimento">
                <Select value={form.dificuldadeAbastecimento} onChange={e => set('dificuldadeAbastecimento', e.target.value)}>
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </Select>
              </FormField>
            </div>
            <div className="mt-4 space-y-2">
              <CheckboxField label="Aceita fornecedor local" checked={form.aceitaFornecedorLocal} onChange={v => set('aceitaFornecedorLocal', v)} />
              <CheckboxField label="Precisa de entrega" checked={form.precisaDeEntrega} onChange={v => set('precisaDeEntrega', v)} />
              <CheckboxField label="Precisa de nota fiscal" checked={form.precisaDeNotaFiscal} onChange={v => set('precisaDeNotaFiscal', v)} />
            </div>
          </FormSection>
          <FormSection titulo="Requisitos e Observações">
            <div className="space-y-3">
              <FormField label="Requisitos específicos"><Input value={form.requisitos} onChange={e => set('requisitos', e.target.value)} placeholder="Ex: embalagem específica, certificação..." /></FormField>
              <FormField label="Observações"><Textarea value={form.observacoes} onChange={e => set('observacoes', e.target.value)} placeholder="Detalhes adicionais sobre a demanda..." /></FormField>
            </div>
          </FormSection>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60"><Save className="w-4 h-4" />{loading ? 'Salvando...' : 'Salvar Demanda'}</button>
            <Link href="/demandas" className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
