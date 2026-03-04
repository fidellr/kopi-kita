import { prisma } from '@/lib/prisma'
import CustomersClient from './CustomersClient'

export const dynamic = 'force-dynamic'

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const allTags = [...new Set(customers.flatMap(c => c.tags))].sort()

  return <CustomersClient initialCustomers={customers} allTags={allTags} />
}
