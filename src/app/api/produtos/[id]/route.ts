import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
      include: { categoria: true },
    })
    if (!produto) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
    return NextResponse.json(produto)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar produto' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: body,
      include: { categoria: true },
    })
    return NextResponse.json(produto)
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.produto.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 })
  }
}
