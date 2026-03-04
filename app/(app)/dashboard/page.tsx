import { prisma } from "@/lib/prisma";
import { aggregateTags, getTopDrinks, formatRelativeDate } from "@/lib/utils";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  const tagCounts = aggregateTags(customers);
  const topDrinks = getTopDrinks(customers);

  const recent = customers.slice(0, 5).map((c) => ({
    ...c,
    createdAtRelative: formatRelativeDate(c.createdAt),
  }));

  const cachedPromo = await prisma.promoCache.findFirst({
    orderBy: { createdAt: "desc" },
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  return {
    totalCustomers: customers.length,
    tagCounts,
    topDrinks,
    recentCustomers: recent,
    cachedPromo: cachedPromo?.data as any,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardClient data={data} />;
}
