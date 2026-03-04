import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const customers = [
  { name: 'Rina Susanti', contact: '081234567890', favoriteDrink: 'Caramel Cold Brew', tags: ['sweet drinks', 'caramel', 'cold brew'] },
  { name: 'Budi Santoso', contact: 'budi@email.com', favoriteDrink: 'Oat Milk Latte', tags: ['oat milk', 'latte', 'health conscious'] },
  { name: 'Dewi Rahayu', contact: '089876543210', favoriteDrink: 'Caramel Macchiato', tags: ['sweet drinks', 'caramel', 'macchiato'] },
  { name: 'Agus Wijaya', contact: 'agus@email.com', favoriteDrink: 'Croissant + Black Coffee', tags: ['pastry lover', 'black coffee', 'morning buyer'] },
  { name: 'Siti Nurhaliza', contact: '082345678901', favoriteDrink: 'Oat Milk Cappuccino', tags: ['oat milk', 'cappuccino', 'health conscious'] },
  { name: 'Eko Prasetyo', contact: 'eko@email.com', favoriteDrink: 'Vanilla Latte Extra Ice', tags: ['sweet drinks', 'vanilla', 'extra ice', 'latte'] },
  { name: 'Fitri Handayani', contact: '087654321098', favoriteDrink: 'Matcha Latte', tags: ['matcha', 'oat milk', 'health conscious'] },
  { name: 'Hendra Gunawan', contact: 'hendra@email.com', favoriteDrink: 'Americano + Croissant', tags: ['pastry lover', 'black coffee', 'morning buyer'] },
  { name: 'Indah Permata', contact: '085432109876', favoriteDrink: 'Caramel Frappuccino', tags: ['sweet drinks', 'caramel', 'cold brew', 'extra ice'] },
  { name: 'Joko Susilo', contact: 'joko@email.com', favoriteDrink: 'Espresso', tags: ['black coffee', 'espresso'] },
  { name: 'Kartini Dewi', contact: '083210987654', favoriteDrink: 'Oat Milk Flat White', tags: ['oat milk', 'flat white', 'health conscious'] },
  { name: 'Lukman Hakim', contact: 'lukman@email.com', favoriteDrink: 'Banana Walnut Muffin + Latte', tags: ['pastry lover', 'sweet drinks', 'latte', 'morning buyer'] },
  { name: 'Maya Sari', contact: '081098765432', favoriteDrink: 'Caramel Latte Extra Sweet', tags: ['sweet drinks', 'caramel', 'latte'] },
  { name: 'Nugroho Adi', contact: 'nugroho@email.com', favoriteDrink: 'V60 Pour Over', tags: ['black coffee', 'specialty coffee', 'workshop'] },
  { name: 'Olivia Tanaka', contact: '089012345678', favoriteDrink: 'Oat Milk Mocha', tags: ['oat milk', 'mocha', 'sweet drinks'] },
  { name: 'Putri Ayu', contact: 'putri@email.com', favoriteDrink: 'Strawberry Smoothie', tags: ['sweet drinks', 'non-coffee', 'extra ice'] },
  { name: 'Qori Ananda', contact: '082109876543', favoriteDrink: 'Latte Art Class Attendee', tags: ['workshop', 'latte', 'latte art'] },
  { name: 'Rizky Fauzi', contact: 'rizky@email.com', favoriteDrink: 'Caramel Affogato', tags: ['sweet drinks', 'caramel', 'espresso'] },
  { name: 'Sari Indrawati', contact: '087543210987', favoriteDrink: 'Almond Croissant + Oat Latte', tags: ['pastry lover', 'oat milk', 'morning buyer', 'health conscious'] },
  { name: 'Teguh Prasetya', contact: 'teguh@email.com', favoriteDrink: 'Cold Brew Extra Ice', tags: ['cold brew', 'extra ice', 'black coffee'] },
  { name: 'Ulfa Rahmawati', contact: '083456789012', favoriteDrink: 'Caramel Oat Latte', tags: ['sweet drinks', 'caramel', 'oat milk', 'latte'] },
  { name: 'Vian Kusuma', contact: 'vian@email.com', favoriteDrink: 'Chocolate Croissant', tags: ['pastry lover', 'sweet drinks', 'morning buyer'] },
  { name: 'Wulan Sari', contact: '086789012345', favoriteDrink: 'Matcha Oat Latte', tags: ['matcha', 'oat milk', 'health conscious', 'sweet drinks'] },
  { name: 'Xandra Putri', contact: 'xandra@email.com', favoriteDrink: 'Vanilla Cold Brew', tags: ['cold brew', 'vanilla', 'sweet drinks', 'extra ice'] },
  { name: 'Yoga Pratama', contact: '085901234567', favoriteDrink: 'Workshop: Latte Art Basic', tags: ['workshop', 'latte art', 'latte'] },
  { name: 'Zahra Amelia', contact: 'zahra@email.com', favoriteDrink: 'Caramel Oat Cappuccino', tags: ['sweet drinks', 'caramel', 'oat milk', 'cappuccino'] },
  { name: 'Ahmad Firdaus', contact: '081234567891', favoriteDrink: 'Black Coffee + Croissant', tags: ['black coffee', 'pastry lover', 'morning buyer'] },
  { name: 'Bella Novita', contact: 'bella@email.com', favoriteDrink: 'Sweet Matcha Oat', tags: ['matcha', 'oat milk', 'sweet drinks', 'health conscious'] },
  { name: 'Cahyo Wibowo', contact: '089876543211', favoriteDrink: 'Cold Brew Caramel Float', tags: ['cold brew', 'caramel', 'sweet drinks'] },
  { name: 'Diana Kusuma', contact: 'diana@email.com', favoriteDrink: 'Banana Bread + Latte', tags: ['pastry lover', 'latte', 'morning buyer', 'sweet drinks'] },
]

async function main() {
  console.log('🌱 Seeding database...')
  
  await prisma.chatMessage.deleteMany()
  await prisma.promoCache.deleteMany()
  await prisma.customer.deleteMany()
  
  for (const customer of customers) {
    await prisma.customer.create({ data: customer })
  }
  
  console.log(`✅ Created ${customers.length} customers`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
