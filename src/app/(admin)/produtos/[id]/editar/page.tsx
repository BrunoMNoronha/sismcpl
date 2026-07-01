import { ProdutoForm } from '../../ProdutoForm'
export default async function EditarProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProdutoForm id={Number(id)} />
}
