import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const produtores = await prisma.produtor.findMany({
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(produtores)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar produtores' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const produtor = await prisma.produtor.create({ data: body })
    return NextResponse.json(produtor, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro ao criar produtor' }, { status: 500 })
  }
}
