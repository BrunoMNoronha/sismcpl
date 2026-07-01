import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const produtor = await prisma.produtor.findUnique({ where: { id: Number(id) } })
    if (!produtor) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
    return NextResponse.json(produtor)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar produtor' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const produtor = await prisma.produtor.update({ where: { id: Number(id) }, data: body })
    return NextResponse.json(produtor)
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar produtor' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.produtor.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir produtor' }, { status: 500 })
  }
}
