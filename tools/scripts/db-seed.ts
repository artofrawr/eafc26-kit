/**
 * Database Seed Script
 * Populates the development database with sample data
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  console.log('');

  // Clean existing data (in correct order due to foreign keys)
  console.log('Cleaning existing data...');
  await prisma.sbcSolution.deleteMany();
  await prisma.sbcChallenge.deleteMany();
  await prisma.player.deleteMany();

  // Seed Players
  console.log('Creating players...');
  const players = await Promise.all([
    prisma.player.create({
      data: {
        name: 'Lionel Messi',
        rating: 93,
        position: 'RW',
        nationality: 'Argentina',
        league: 'Ligue 1',
        club: 'Inter Miami',
        price: 150000,
      },
    }),
    prisma.player.create({
      data: {
        name: 'Cristiano Ronaldo',
        rating: 91,
        position: 'ST',
        nationality: 'Portugal',
        league: 'Saudi Pro League',
        club: 'Al Nassr',
        price: 120000,
      },
    }),
    prisma.player.create({
      data: {
        name: 'Kylian Mbappé',
        rating: 92,
        position: 'ST',
        nationality: 'France',
        league: 'La Liga',
        club: 'Real Madrid',
        price: 200000,
      },
    }),
    prisma.player.create({
      data: {
        name: 'Erling Haaland',
        rating: 91,
        position: 'ST',
        nationality: 'Norway',
        league: 'Premier League',
        club: 'Manchester City',
        price: 180000,
      },
    }),
    prisma.player.create({
      data: {
        name: 'Kevin De Bruyne',
        rating: 91,
        position: 'CM',
        nationality: 'Belgium',
        league: 'Premier League',
        club: 'Manchester City',
        price: 160000,
      },
    }),
  ]);

  console.log(`✓ Created ${players.length} players`);

  // Seed SBC Challenges
  console.log('Creating SBC challenges...');
  const challenges = await Promise.all([
    prisma.sbcChallenge.create({
      data: {
        name: 'Premier League Squad',
        description: 'Build a squad with Premier League players',
        requirements: {
          minRating: 85,
          numPlayers: 11,
          league: 'Premier League',
          chemistry: 80,
        },
      },
    }),
    prisma.sbcChallenge.create({
      data: {
        name: 'Top Nations',
        description: 'Build a squad with players from top nations',
        requirements: {
          minRating: 88,
          numPlayers: 11,
          nations: ['Argentina', 'Portugal', 'France', 'Brazil'],
          chemistry: 90,
        },
      },
    }),
    prisma.sbcChallenge.create({
      data: {
        name: 'Budget Beast',
        description: 'Build a competitive squad on a budget',
        requirements: {
          minRating: 82,
          numPlayers: 11,
          maxCost: 50000,
          chemistry: 75,
        },
      },
    }),
  ]);

  console.log(`✓ Created ${challenges.length} SBC challenges`);

  // Seed SBC Solutions (optional)
  console.log('Creating sample solutions...');
  const solutions = await Promise.all([
    prisma.sbcSolution.create({
      data: {
        challengeId: challenges[0].id,
        players: {
          players: [
            { id: players[3].id, name: players[3].name, position: players[3].position },
            { id: players[4].id, name: players[4].name, position: players[4].position },
          ],
        },
        totalRating: 91,
        totalCost: 340000,
        chemistry: 85,
      },
    }),
  ]);

  console.log(`✓ Created ${solutions.length} solutions`);

  console.log('');
  console.log('===================================');
  console.log('✓ Database seeding completed!');
  console.log('===================================');
  console.log('');
  console.log('Seeded data:');
  console.log(`  - ${players.length} players`);
  console.log(`  - ${challenges.length} SBC challenges`);
  console.log(`  - ${solutions.length} solutions`);
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
