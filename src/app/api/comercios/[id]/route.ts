import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const comercio = await prisma.comercio.findUnique({ where: { id: Number(id) } })
    if (!comercio) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
    return NextResponse.json(comercio)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar comércio' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const comercio = await prisma.comercio.update({ where: { id: Number(id) }, data: body })
    return NextResponse.json(comercio)
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar comércio' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.comercio.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir comércio' }, { status: 500 })
  }
}
