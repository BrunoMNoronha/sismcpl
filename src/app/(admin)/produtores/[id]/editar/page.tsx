import { ProdutorForm } from '../../ProdutorForm'
export default async function EditarProdutorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProdutorForm id={Number(id)} />
}
