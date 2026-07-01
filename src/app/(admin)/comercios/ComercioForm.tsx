'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { FormSection, FormField, Input, Select, Textarea, CheckboxField } from '@/components/FormSection'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ComercioFormProps {
  id?: number
}

export function ComercioForm({ id }: ComercioFormProps) {
  const router = useRouter()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: '', responsavel: '', tipo: '', telefone: '',
    endereco: '', bairro: '', latitude: '', longitude: '',
    porte: '', compraDeProdutoresLocais: false,
    interesseEmComprarLocal: false, observacoes: '', ativo: true,
  })

  useEffect(() => {
    if (id) {
      fetch(`/api/comercios/${id}`).then(r => r.json()).then(data => {
        setForm({
          ...data,
          latitude: data.latitude ?? '',
          longitude: data.longitude ?? '',
        })
      })
    }
  }, [id])

  const set = (field: string, value: unknown) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.responsavel || !form.tipo || !form.telefone) {
      alert('Preencha os campos obrigatórios: Nome, Responsável, Tipo e Telefone.')
      return
    }
    setLoading(true)
    const payload = {
      ...form,
      latitude: form.latitude !== '' ? Number(form.latitude) : null,
      longitude: form.longitude !== '' ? Number(form.longitude) : null,
    }
    const url = isEditing ? `/api/comercios/${id}` : '/api/comercios'
    const method = isEditing ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    router.push('/comercios')
  }

  return (
    <div>
      <Header
        title={isEditing ? 'Editar Comércio' : 'Novo Comércio'}
        subtitle={isEditing ? 'Atualize os dados do estabelecimento' : 'Cadastre um novo estabelecimento comercial'}
      />
      <div className="p-6">
        <Link href="/comercios" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-5">
          <ArrowLeft className="w-4 h-4" /> Voltar para Comércios
        </Link>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
          <FormSection titulo="Dados Principais" descricao="Campos obrigatórios marcados com *">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Nome do Comércio" required>
                <Input value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Mercearia São João" required />
              </FormField>
              <FormField label="Nome do Responsável" required>
                <Input value={form.responsavel} onChange={e => set('responsavel', e.target.value)} placeholder="Ex: João Batista" required />
              </FormField>
              <FormField label="Tipo de Comércio" required>
                <Select value={form.tipo} onChange={e => set('tipo', e.target.value)} required>
                  <option value="">Selecione...</option>
                  {['Mercearia', 'Supermercado', 'Restaurante', 'Bar / Lanchonete', 'Açougue', 'Feira / Banca', 'Padaria', 'Hortifruti', 'Outro'].map(t => <option key={t} value={t}>{t}</option>)}
                </Select>
              </FormField>
              <FormField label="Telefone / WhatsApp" required>
                <Input value={form.telefone} onChange={e => set('telefone', e.target.value)} placeholder="(XX) 99999-9999" required />
              </FormField>
              <FormField label="Porte">
                <Select value={form.porte} onChange={e => set('porte', e.target.value)}>
                  <option value="">Selecione...</option>
                  <option value="micro">Micro</option>
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </Select>
              </FormField>
            </div>
          </FormSection>

          <FormSection titulo="Localização">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Endereço">
                <Input value={form.endereco} onChange={e => set('endereco', e.target.value)} placeholder="Rua, número" />
              </FormField>
              <FormField label="Bairro / Comunidade">
                <Input value={form.bairro} onChange={e => set('bairro', e.target.value)} placeholder="Ex: Centro" />
              </FormField>
              <FormField label="Latitude">
                <Input type="number" step="any" value={form.latitude} onChange={e => set('latitude', e.target.value)} placeholder="-8.123456" />
              </FormField>
              <FormField label="Longitude">
                <Input type="number" step="any" value={form.longitude} onChange={e => set('longitude', e.target.value)} placeholder="-38.123456" />
              </FormField>
            </div>
          </FormSection>

          <FormSection titulo="Relação com Produtores Locais">
            <div className="space-y-3">
              <CheckboxField
                label="Já compra de produtores locais atualmente"
                checked={form.compraDeProdutoresLocais}
                onChange={v => set('compraDeProdutoresLocais', v)}
              />
              <CheckboxField
                label="Tem interesse em comprar de produtores locais"
                checked={form.interesseEmComprarLocal}
                onChange={v => set('interesseEmComprarLocal', v)}
              />
              {isEditing && (
                <CheckboxField
                  label="Comércio ativo"
                  checked={form.ativo}
                  onChange={v => set('ativo', v)}
                />
              )}
            </div>
          </FormSection>

          <FormSection titulo="Observações">
            <Textarea
              value={form.observacoes}
              onChange={e => set('observacoes', e.target.value)}
              placeholder="Informações adicionais, horários, particularidades..."
            />
          </FormSection>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Salvando...' : 'Salvar Comércio'}
            </button>
            <Link href="/comercios" className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
