import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calcularQuantidadeMensal } from '@/utils'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const demanda = await prisma.demandaComercial.findUnique({
      where: { id: Number(id) },
      include: { comercio: true, produto: { include: { categoria: true } } },
    })
    if (!demanda) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
    return NextResponse.json(demanda)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar demanda' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    body.quantidadeMensalEstimada = calcularQuantidadeMensal(body.quantidade, body.frequencia)
    const demanda = await prisma.demandaComercial.update({
      where: { id: Number(id) },
      data: body,
      include: { comercio: true, produto: { include: { categoria: true } } },
    })
    return NextResponse.json(demanda)
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar demanda' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.demandaComercial.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir demanda' }, { status: 500 })
  }
}
