import { plainToClass, Transform } from 'class-transformer';
import { IsString, IsArray, ArrayMinSize, IsOptional, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';

class UsageExampleDto {
  @IsOptional()
  @IsString()
  sentence: string;

  @IsOptional()
  @IsString()
  translation: string;
}

export class CreateCommonWordDto {
  @IsString()
  word: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  translations: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  definitions: string[];

  @IsOptional()
  @IsString()
  transcription: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({ value: values }) => values.map(value => plainToClass(UsageExampleDto, value)))
  usageExamples: UsageExampleDto[];
}



export class UpdateCommonWordDto {
  @IsOptional()
  @IsString()
  word: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  translations: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  definitions: string[];

  @IsOptional()
  @IsString()
  transcription: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({ value: values }) => values.map(value => plainToClass(UsageExampleDto, value)))
  usageExamples: UsageExampleDto[];
}


