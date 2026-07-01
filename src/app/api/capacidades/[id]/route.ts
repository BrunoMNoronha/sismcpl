import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calcularQuantidadeMensal } from '@/utils'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const capacidade = await prisma.capacidadeProdutiva.findUnique({
      where: { id: Number(id) },
      include: { produtor: true, produto: { include: { categoria: true } } },
    })
    if (!capacidade) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
    return NextResponse.json(capacidade)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar capacidade' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    body.quantidadeMensalEstimada = calcularQuantidadeMensal(body.quantidade, body.frequencia)
    const capacidade = await prisma.capacidadeProdutiva.update({
      where: { id: Number(id) },
      data: body,
      include: { produtor: true, produto: { include: { categoria: true } } },
    })
    return NextResponse.json(capacidade)
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar capacidade' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.capacidadeProdutiva.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir capacidade' }, { status: 500 })
  }
}
