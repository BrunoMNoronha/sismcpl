import { DemandaForm } from '../../DemandaForm'
export default async function EditarDemandaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <DemandaForm id={Number(id)} />
}
