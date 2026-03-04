import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const customerSchema = z.object({
  name: z.string().min(1).max(100),
  contact: z.string().max(200).optional().nullable(),
  favoriteDrink: z.string().max(200).optional().nullable(),
  tags: z.array(z.string().max(50)).max(20).default([]),
  notes: z.string().max(500).optional().nullable(),
})

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function GET(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const tags = searchParams.getAll('tag')

  const customers = await prisma.customer.findMany({
    where: {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { favoriteDrink: { contains: search, mode: 'insensitive' } },
            { tags: { hasSome: [search] } },
          ]
        } : {},
        tags.length > 0 ? { tags: { hasEvery: tags } } : {},
      ]
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(customers)
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const data = customerSchema.parse(body)
    
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        contact: data.contact || null,
        favoriteDrink: data.favoriteDrink || null,
        tags: data.tags,
        notes: data.notes || null,
      }
    })
    
    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
