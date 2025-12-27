/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for DTOs (Data Transfer Objects).
 * Use this as a reference when creating request/response validation.
 */

import { IsString, IsBoolean, IsOptional, MinLength, MaxLength } from 'class-validator';

/**
 * DTO for creating a new example
 */
export class CreateExampleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

/**
 * DTO for updating an existing example
 * All fields are optional for partial updates
 */
export class UpdateExampleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

/**
 * Response DTO (optional - for explicit API contracts)
 */
export class ExampleResponseDto {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
