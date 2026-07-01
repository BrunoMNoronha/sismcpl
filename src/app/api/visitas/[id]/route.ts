import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const visita = await prisma.visitaCampo.findUnique({
      where: { id: Number(id) },
      include: { comercio: true, produtor: true },
    })
    if (!visita) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
    return NextResponse.json(visita)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar visita' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    if (body.dataVisita) body.dataVisita = new Date(body.dataVisita)
    if (body.dataRetornoSugerida) body.dataRetornoSugerida = new Date(body.dataRetornoSugerida)
    const visita = await prisma.visitaCampo.update({
      where: { id: Number(id) },
      data: body,
      include: { comercio: true, produtor: true },
    })
    return NextResponse.json(visita)
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar visita' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.visitaCampo.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir visita' }, { status: 500 })
  }
}
