import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const comercios = await prisma.comercio.findMany({
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(comercios)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar comércios' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const comercio = await prisma.comercio.create({ data: body })
    return NextResponse.json(comercio, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar comércio' }, { status: 500 })
  }
}
