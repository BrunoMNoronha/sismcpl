import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categorias = await prisma.categoriaProduto.findMany({
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(categorias)
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const categoria = await prisma.categoriaProduto.create({ data: body })
    return NextResponse.json(categoria, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 })
  }
}
