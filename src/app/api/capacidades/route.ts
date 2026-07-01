import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calcularQuantidadeMensal } from '@/utils'

export async function GET() {
  try {
    const capacidades = await prisma.capacidadeProdutiva.findMany({
      include: { produtor: true, produto: { include: { categoria: true } } },
      orderBy: { criadoEm: 'desc' },
    })
    return NextResponse.json(capacidades)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar capacidades' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    body.quantidadeMensalEstimada = calcularQuantidadeMensal(body.quantidade, body.frequencia)
    const capacidade = await prisma.capacidadeProdutiva.create({
      data: body,
      include: { produtor: true, produto: { include: { categoria: true } } },
    })
    return NextResponse.json(capacidade, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro ao criar capacidade' }, { status: 500 })
  }
}
