/**
 * Database Seed Script
 * Populates the development database with sample data
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  console.log('');
  console.log('No models defined yet. Add models to schema.prisma first.');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
