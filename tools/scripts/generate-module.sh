#!/bin/bash

# Module Generator Script
# Generates a complete NestJS feature module from templates

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if module name is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Module name is required${NC}"
  echo "Usage: $0 <module-name>"
  echo "Example: $0 player"
  exit 1
fi

MODULE_NAME=$1
MODULE_DIR="apps/api/src/${MODULE_NAME}"

# Check if module already exists
if [ -d "$MODULE_DIR" ]; then
  echo -e "${RED}Error: Module '${MODULE_NAME}' already exists at ${MODULE_DIR}${NC}"
  exit 1
fi

echo -e "${GREEN}Generating module: ${MODULE_NAME}${NC}"
echo ""

# Create module directory structure
echo "Creating directory structure..."
mkdir -p "${MODULE_DIR}/dto"

# Convert module name to different cases
MODULE_CLASS=$(echo "$MODULE_NAME" | sed -E 's/(^|-)([a-z])/\U\2/g')  # PascalCase
MODULE_KEBAB=$(echo "$MODULE_NAME" | sed 's/_/-/g')                    # kebab-case

echo "  - ${MODULE_DIR}/"
echo "  - ${MODULE_DIR}/dto/"
echo ""

# Generate Controller
echo "Generating ${MODULE_NAME}.controller.ts..."
cat > "${MODULE_DIR}/${MODULE_KEBAB}.controller.ts" << EOF
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ${MODULE_CLASS}Service } from './${MODULE_KEBAB}.service';
import { Create${MODULE_CLASS}Dto, Update${MODULE_CLASS}Dto } from './dto/create-${MODULE_KEBAB}.dto';

@Controller('api/${MODULE_KEBAB}s')
export class ${MODULE_CLASS}Controller {
  constructor(private readonly ${MODULE_NAME}Service: ${MODULE_CLASS}Service) {}

  @Get()
  async findAll() {
    return this.${MODULE_NAME}Service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.${MODULE_NAME}Service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: Create${MODULE_CLASS}Dto) {
    return this.${MODULE_NAME}Service.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: Update${MODULE_CLASS}Dto) {
    return this.${MODULE_NAME}Service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.${MODULE_NAME}Service.remove(id);
  }
}
EOF

# Generate Service
echo "Generating ${MODULE_NAME}.service.ts..."
cat > "${MODULE_DIR}/${MODULE_KEBAB}.service.ts" << EOF
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@eafc26-kit/database';
import { Create${MODULE_CLASS}Dto, Update${MODULE_CLASS}Dto } from './dto/create-${MODULE_KEBAB}.dto';

@Injectable()
export class ${MODULE_CLASS}Service {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.${MODULE_NAME}.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const ${MODULE_NAME} = await this.prisma.${MODULE_NAME}.findUnique({
      where: { id },
    });

    if (!${MODULE_NAME}) {
      throw new NotFoundException(\`${MODULE_CLASS} with ID \${id} not found\`);
    }

    return ${MODULE_NAME};
  }

  async create(createDto: Create${MODULE_CLASS}Dto) {
    return this.prisma.${MODULE_NAME}.create({
      data: createDto,
    });
  }

  async update(id: string, updateDto: Update${MODULE_CLASS}Dto) {
    await this.findOne(id); // Verify exists

    return this.prisma.${MODULE_NAME}.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verify exists

    await this.prisma.${MODULE_NAME}.delete({
      where: { id },
    });
  }
}
EOF

# Generate DTOs
echo "Generating dto/create-${MODULE_NAME}.dto.ts..."
cat > "${MODULE_DIR}/dto/create-${MODULE_KEBAB}.dto.ts" << EOF
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class Create${MODULE_CLASS}Dto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}

export class Update${MODULE_CLASS}Dto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;
}
EOF

# Generate Module
echo "Generating ${MODULE_NAME}.module.ts..."
cat > "${MODULE_DIR}/${MODULE_KEBAB}.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${MODULE_CLASS}Controller } from './${MODULE_KEBAB}.controller';
import { ${MODULE_CLASS}Service } from './${MODULE_KEBAB}.service';
import { PrismaService } from '@eafc26-kit/database';

@Module({
  imports: [],
  controllers: [${MODULE_CLASS}Controller],
  providers: [${MODULE_CLASS}Service, PrismaService],
  exports: [${MODULE_CLASS}Service],
})
export class ${MODULE_CLASS}Module {}
EOF

# Generate Controller Test
echo "Generating ${MODULE_NAME}.controller.spec.ts..."
cat > "${MODULE_DIR}/${MODULE_KEBAB}.controller.spec.ts" << EOF
import { Test, TestingModule } from '@nestjs/testing';
import { ${MODULE_CLASS}Controller } from './${MODULE_KEBAB}.controller';
import { ${MODULE_CLASS}Service } from './${MODULE_KEBAB}.service';

describe('${MODULE_CLASS}Controller', () => {
  let controller: ${MODULE_CLASS}Controller;
  let service: ${MODULE_CLASS}Service;

  const mock${MODULE_CLASS}Service = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${MODULE_CLASS}Controller],
      providers: [
        {
          provide: ${MODULE_CLASS}Service,
          useValue: mock${MODULE_CLASS}Service,
        },
      ],
    }).compile();

    controller = module.get<${MODULE_CLASS}Controller>(${MODULE_CLASS}Controller);
    service = module.get<${MODULE_CLASS}Service>(${MODULE_CLASS}Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add your tests here
});
EOF

# Generate Service Test
echo "Generating ${MODULE_NAME}.service.spec.ts..."
cat > "${MODULE_DIR}/${MODULE_KEBAB}.service.spec.ts" << EOF
import { Test, TestingModule } from '@nestjs/testing';
import { ${MODULE_CLASS}Service } from './${MODULE_KEBAB}.service';
import { PrismaService } from '@eafc26-kit/database';

describe('${MODULE_CLASS}Service', () => {
  let service: ${MODULE_CLASS}Service;
  let prisma: PrismaService;

  const mockPrismaService = {
    ${MODULE_NAME}: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ${MODULE_CLASS}Service,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<${MODULE_CLASS}Service>(${MODULE_CLASS}Service);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add your tests here
});
EOF

echo ""
echo -e "${GREEN}✓ Module '${MODULE_NAME}' generated successfully!${NC}"
echo ""
echo "Files created:"
echo "  - ${MODULE_DIR}/${MODULE_KEBAB}.controller.ts"
echo "  - ${MODULE_DIR}/${MODULE_KEBAB}.service.ts"
echo "  - ${MODULE_DIR}/${MODULE_KEBAB}.module.ts"
echo "  - ${MODULE_DIR}/dto/create-${MODULE_KEBAB}.dto.ts"
echo "  - ${MODULE_DIR}/${MODULE_KEBAB}.controller.spec.ts"
echo "  - ${MODULE_DIR}/${MODULE_KEBAB}.service.spec.ts"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Add ${MODULE_CLASS}Module to apps/api/src/app/app.module.ts imports"
echo "2. Create Prisma model for '${MODULE_NAME}' in libs/database/prisma/schema.prisma"
echo "3. Run: npm run db:generate && npm run db:migrate"
echo "4. Implement tests in the generated .spec.ts files"
echo "5. Customize the controller, service, and DTOs as needed"
echo ""
echo -e "${GREEN}Happy coding!${NC}"
