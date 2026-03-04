import { prisma } from '@/lib/prisma'
import { aggregateTags, getTopDrinks } from '@/lib/utils'
import PromosClient from './PromosClient'

export const dynamic = 'force-dynamic'

export default async function PromosPage() {
  const customers = await prisma.customer.findMany()
  
  const tagCounts = aggregateTags(customers)
  const topDrinks = getTopDrinks(customers)
  
  const cachedPromo = await prisma.promoCache.findFirst({
    orderBy: { createdAt: 'desc' },
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  })

  return (
    <PromosClient
      totalCustomers={customers.length}
      tagCounts={tagCounts}
      topDrinks={topDrinks}
      cachedPromo={cachedPromo?.data as any}
    />
  )
}
