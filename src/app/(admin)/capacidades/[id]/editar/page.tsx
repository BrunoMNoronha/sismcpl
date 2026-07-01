import { CapacidadeForm } from '../../CapacidadeForm'
export default async function EditarCapacidadePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <CapacidadeForm id={Number(id)} />
}
