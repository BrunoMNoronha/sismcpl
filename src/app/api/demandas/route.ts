import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calcularQuantidadeMensal } from '@/utils'

export async function GET() {
  try {
    const demandas = await prisma.demandaComercial.findMany({
      include: { comercio: true, produto: { include: { categoria: true } } },
      orderBy: { criadoEm: 'desc' },
    })
    return NextResponse.json(demandas)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar demandas' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    body.quantidadeMensalEstimada = calcularQuantidadeMensal(body.quantidade, body.frequencia)
    const demanda = await prisma.demandaComercial.create({
      data: body,
      include: { comercio: true, produto: { include: { categoria: true } } },
    })
    return NextResponse.json(demanda, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro ao criar demanda' }, { status: 500 })
  }
}
