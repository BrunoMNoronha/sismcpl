'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { FormSection, FormField, Input, Select, Textarea, CheckboxField } from '@/components/FormSection'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Comercio, Produtor } from '@/types'

export function VisitaForm({ id }: { id?: number }) {
  const router = useRouter()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [comercios, setComercios] = useState<Comercio[]>([])
  const [produtores, setProdutores] = useState<Produtor[]>([])
  const [form, setForm] = useState({
    tipoVisitado: 'comercio', comercioId: '', produtorId: '',
    dataVisita: '', agenteResponsavel: '', observacoes: '',
    pendencias: '', precisaRetorno: false, dataRetornoSugerida: '',
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/comercios').then(r => r.json()),
      fetch('/api/produtores').then(r => r.json()),
    ]).then(([c, p]) => { setComercios(c); setProdutores(p) })
    if (id) {
      fetch(`/api/visitas/${id}`).then(r => r.json()).then(data => {
        setForm({
          ...data,
          comercioId: data.comercioId ? String(data.comercioId) : '',
          produtorId: data.produtorId ? String(data.produtorId) : '',
          dataVisita: data.dataVisita ? new Date(data.dataVisita).toISOString().split('T')[0] : '',
          dataRetornoSugerida: data.dataRetornoSugerida ? new Date(data.dataRetornoSugerida).toISOString().split('T')[0] : '',
        })
      })
    }
  }, [id])

  const set = (field: string, value: unknown) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.dataVisita || !form.agenteResponsavel) { alert('Preencha data e agente responsável.'); return }
    if (form.tipoVisitado === 'comercio' && !form.comercioId) { alert('Selecione o comércio visitado.'); return }
    if (form.tipoVisitado === 'produtor' && !form.produtorId) { alert('Selecione o produtor visitado.'); return }
    setLoading(true)
    const payload = {
      ...form,
      comercioId: form.tipoVisitado === 'comercio' && form.comercioId ? Number(form.comercioId) : null,
      produtorId: form.tipoVisitado === 'produtor' && form.produtorId ? Number(form.produtorId) : null,
      dataRetornoSugerida: form.dataRetornoSugerida || null,
    }
    const url = isEditing ? `/api/visitas/${id}` : '/api/visitas'
    await fetch(url, { method: isEditing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    router.push('/visitas')
  }

  return (
    <div>
      <Header title={isEditing ? 'Editar Visita' : 'Nova Visita de Campo'} subtitle="Registre a visita a um comércio ou produtor" />
      <div className="p-6">
        <Link href="/visitas" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-5"><ArrowLeft className="w-4 h-4" /> Voltar</Link>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
          <FormSection titulo="Identificação da Visita">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Tipo de Visitado" required>
                <Select value={form.tipoVisitado} onChange={e => set('tipoVisitado', e.target.value)}>
                  <option value="comercio">Comércio</option>
                  <option value="produtor">Produtor</option>
                </Select>
              </FormField>
              {form.tipoVisitado === 'comercio' ? (
                <FormField label="Comércio Visitado" required>
                  <Select value={form.comercioId} onChange={e => set('comercioId', e.target.value)} required>
                    <option value="">Selecione...</option>
                    {comercios.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                  </Select>
                </FormField>
              ) : (
                <FormField label="Produtor Visitado" required>
                  <Select value={form.produtorId} onChange={e => set('produtorId', e.target.value)} required>
                    <option value="">Selecione...</option>
                    {produtores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                  </Select>
                </FormField>
              )}
              <FormField label="Data da Visita" required><Input type="date" value={form.dataVisita} onChange={e => set('dataVisita', e.target.value)} required /></FormField>
              <FormField label="Agente Responsável" required><Input value={form.agenteResponsavel} onChange={e => set('agenteResponsavel', e.target.value)} placeholder="Nome do agente" required /></FormField>
            </div>
          </FormSection>
          <FormSection titulo="Registro da Visita">
            <div className="space-y-3">
              <FormField label="Observações"><Textarea value={form.observacoes} onChange={e => set('observacoes', e.target.value)} placeholder="O que foi discutido, situação encontrada, produtos, interesse..." /></FormField>
              <FormField label="Pendências"><Textarea value={form.pendencias} onChange={e => set('pendencias', e.target.value)} placeholder="Ações a serem tomadas, encaminhamentos..." /></FormField>
            </div>
          </FormSection>
          <FormSection titulo="Retorno">
            <CheckboxField label="Precisa de visita de retorno" checked={form.precisaRetorno} onChange={v => set('precisaRetorno', v)} />
            {form.precisaRetorno && (
              <div className="mt-3">
                <FormField label="Data de retorno sugerida">
                  <Input type="date" value={form.dataRetornoSugerida} onChange={e => set('dataRetornoSugerida', e.target.value)} />
                </FormField>
              </div>
            )}
          </FormSection>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60"><Save className="w-4 h-4" />{loading ? 'Salvando...' : 'Salvar Visita'}</button>
            <Link href="/visitas" className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
