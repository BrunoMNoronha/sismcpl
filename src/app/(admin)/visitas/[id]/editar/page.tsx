import { VisitaForm } from '../../VisitaForm'
export default async function EditarVisitaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <VisitaForm id={Number(id)} />
}
