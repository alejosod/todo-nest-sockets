import { IsOptional, IsString } from 'class-validator';

export class GetManyFilterDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
