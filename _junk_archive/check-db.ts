import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const brands = await prisma.brand.count()
  const services = await prisma.service.count()
  const users = await prisma.user.count()
  console.log(JSON.stringify({ brands, services, users }))
}

main().finally(() => prisma.$disconnect())
