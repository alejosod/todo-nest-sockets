import {
  IsOptional,
  IsEnum,
  IsString,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { SORT_OPTIONS } from '../../common/Dtos';

export class GetManySortDto {
  @IsString()
  @IsOptional()
  @IsEnum(SORT_OPTIONS)
  name: string;

  @IsString()
  @IsOptional()
  @IsEnum(SORT_OPTIONS)
  description: string;

  @IsBoolean()
  @IsOptional()
  @IsEnum(SORT_OPTIONS)
  active: boolean;

  @IsDateString()
  @IsOptional()
  @IsEnum(SORT_OPTIONS)
  createdAt: string;
}
