#!/bin/bash

# Database Reset Script
# Resets the development database to a clean state

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Database Reset Script${NC}"
echo ""

# Check if running in production
if [ "$NODE_ENV" = "production" ]; then
  echo -e "${RED}Error: Cannot run database reset in production!${NC}"
  exit 1
fi

# Confirm with user
echo -e "${RED}WARNING: This will delete ALL data in your database!${NC}"
read -p "Are you sure you want to continue? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
  echo "Database reset cancelled."
  exit 0
fi

echo -e "${GREEN}Step 1: Resetting database...${NC}"

# Reset Prisma migrations (drops and recreates database)
cd libs/database/prisma
npx prisma migrate reset --force --skip-seed
cd ../../..

echo -e "${GREEN}✓ Database reset complete${NC}"
echo ""

echo -e "${GREEN}Step 2: Generating Prisma client...${NC}"
npm run db:generate

echo -e "${GREEN}✓ Prisma client generated${NC}"
echo ""

echo -e "${GREEN}Step 3: Seeding database...${NC}"
npx ts-node tools/scripts/db-seed.ts

echo -e "${GREEN}✓ Database seeded${NC}"
echo ""

echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}Database reset completed successfully!${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""
echo "Next steps:"
echo "  - Your database is now in a clean state"
echo "  - Start the development server: npm run dev"
