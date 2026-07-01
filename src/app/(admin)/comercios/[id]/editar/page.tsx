import { ComercioForm } from '../../ComercioForm'

export default async function EditarComercioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ComercioForm id={Number(id)} />
}
