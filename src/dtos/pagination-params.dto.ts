import { Min, IsOptional, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationParamsDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(0)
  skip?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  limit?: number;
}