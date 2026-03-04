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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const body = await request.json()
    const data = customerSchema.parse(body)

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name: data.name,
        contact: data.contact || null,
        favoriteDrink: data.favoriteDrink || null,
        tags: data.tags,
        notes: data.notes || null,
      }
    })

    return NextResponse.json(customer)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    await prisma.customer.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
  }
}
