'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { FormSection, FormField, Input, Select, Textarea, CheckboxField } from '@/components/FormSection'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function ProdutorForm({ id }: { id?: number }) {
  const router = useRouter()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: '', nomePropriedade: '', telefone: '', documento: '',
    localidade: '', tamanhoPropriedade: '', tipoPropriedade: '',
    latitude: '', longitude: '',
    possuiTransporte: false, possuiIrrigacao: false, possuiAgua: true,
    possuiMaoDeObra: false, possuiDocumentacaoVenda: false,
    interesseVenderLocal: false, observacoes: '', ativo: true,
  })

  useEffect(() => {
    if (id) {
      fetch(`/api/produtores/${id}`).then(r => r.json()).then(data => {
        setForm({ ...data, tamanhoPropriedade: data.tamanhoPropriedade ?? '', latitude: data.latitude ?? '', longitude: data.longitude ?? '' })
      })
    }
  }, [id])

  const set = (field: string, value: unknown) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.telefone || !form.localidade) {
      alert('Preencha os campos obrigatórios: Nome, Telefone e Localidade.')
      return
    }
    setLoading(true)
    const payload = {
      ...form,
      tamanhoPropriedade: form.tamanhoPropriedade !== '' ? Number(form.tamanhoPropriedade) : null,
      latitude: form.latitude !== '' ? Number(form.latitude) : null,
      longitude: form.longitude !== '' ? Number(form.longitude) : null,
    }
    const url = isEditing ? `/api/produtores/${id}` : '/api/produtores'
    await fetch(url, { method: isEditing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    router.push('/produtores')
  }

  return (
    <div>
      <Header title={isEditing ? 'Editar Produtor' : 'Novo Produtor'} subtitle={isEditing ? 'Atualize os dados do produtor' : 'Cadastre um novo produtor rural'} />
      <div className="p-6">
        <Link href="/produtores" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-5"><ArrowLeft className="w-4 h-4" /> Voltar para Produtores</Link>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
          <FormSection titulo="Dados Principais" descricao="Campos obrigatórios marcados com *">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Nome do Produtor" required><Input value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Antônio Ferreira" required /></FormField>
              <FormField label="Nome da Propriedade"><Input value={form.nomePropriedade} onChange={e => set('nomePropriedade', e.target.value)} placeholder="Ex: Sítio Boa Esperança" /></FormField>
              <FormField label="Telefone / WhatsApp" required><Input value={form.telefone} onChange={e => set('telefone', e.target.value)} placeholder="(XX) 99999-9999" required /></FormField>
              <FormField label="Documento (CPF/CNPJ)"><Input value={form.documento} onChange={e => set('documento', e.target.value)} placeholder="000.000.000-00" /></FormField>
              <FormField label="Localidade / Comunidade" required><Input value={form.localidade} onChange={e => set('localidade', e.target.value)} placeholder="Ex: Zona Rural - Serra Alta" required /></FormField>
              <FormField label="Tipo de Propriedade">
                <Select value={form.tipoPropriedade} onChange={e => set('tipoPropriedade', e.target.value)}>
                  <option value="">Selecione...</option>
                  <option value="familiar">Familiar</option>
                  <option value="comercial">Comercial</option>
                  <option value="assentamento">Assentamento</option>
                </Select>
              </FormField>
              <FormField label="Tamanho (hectares)"><Input type="number" step="0.1" value={form.tamanhoPropriedade} onChange={e => set('tamanhoPropriedade', e.target.value)} placeholder="Ex: 12.5" /></FormField>
            </div>
          </FormSection>

          <FormSection titulo="Localização">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Latitude"><Input type="number" step="any" value={form.latitude} onChange={e => set('latitude', e.target.value)} placeholder="-8.123456" /></FormField>
              <FormField label="Longitude"><Input type="number" step="any" value={form.longitude} onChange={e => set('longitude', e.target.value)} placeholder="-38.123456" /></FormField>
            </div>
          </FormSection>

          <FormSection titulo="Infraestrutura e Condições">
            <div className="grid grid-cols-2 gap-3">
              <CheckboxField label="Possui transporte" checked={form.possuiTransporte} onChange={v => set('possuiTransporte', v)} />
              <CheckboxField label="Possui irrigação" checked={form.possuiIrrigacao} onChange={v => set('possuiIrrigacao', v)} />
              <CheckboxField label="Possui acesso à água" checked={form.possuiAgua} onChange={v => set('possuiAgua', v)} />
              <CheckboxField label="Possui mão de obra" checked={form.possuiMaoDeObra} onChange={v => set('possuiMaoDeObra', v)} />
              <CheckboxField label="Possui documentação para venda" checked={form.possuiDocumentacaoVenda} onChange={v => set('possuiDocumentacaoVenda', v)} />
              <CheckboxField label="Interesse em vender para comércio local" checked={form.interesseVenderLocal} onChange={v => set('interesseVenderLocal', v)} />
            </div>
          </FormSection>

          <FormSection titulo="Observações">
            <Textarea value={form.observacoes} onChange={e => set('observacoes', e.target.value)} placeholder="Informações adicionais sobre o produtor, produção, histórico..." />
          </FormSection>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60">
              <Save className="w-4 h-4" />{loading ? 'Salvando...' : 'Salvar Produtor'}
            </button>
            <Link href="/produtores" className="inline-flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
