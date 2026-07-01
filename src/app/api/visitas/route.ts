import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const visitas = await prisma.visitaCampo.findMany({
      include: { comercio: true, produtor: true },
      orderBy: { dataVisita: 'desc' },
    })
    return NextResponse.json(visitas)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar visitas' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (body.dataVisita) body.dataVisita = new Date(body.dataVisita)
    if (body.dataRetornoSugerida) body.dataRetornoSugerida = new Date(body.dataRetornoSugerida)
    const visita = await prisma.visitaCampo.create({
      data: body,
      include: { comercio: true, produtor: true },
    })
    return NextResponse.json(visita, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro ao criar visita' }, { status: 500 })
  }
}
