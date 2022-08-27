import { plainToClass, Transform } from 'class-transformer';
import { IsString, IsArray, ArrayMinSize, IsOptional, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';

class UsageExampleDto {
  // @IsOptional()
  @IsString()
  sentence: string;

  // @IsOptional()
  @IsString()
  translation: string;
}

class TranscriptionDto {
  @IsOptional()
  @IsString()
  uk: string;

  @IsOptional()
  @IsString()
  us: string;
}

export class CreateCommonWordDto {
  @IsString()
  word: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  translations: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  definitions: string[];

  @IsOptional()
  @ValidateNested()
  @Transform(({ value }) => plainToClass(TranscriptionDto, value))
  transcription: TranscriptionDto;

  @IsOptional()
  @IsArray()
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
  @IsString({ each: true })
  translations: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  definitions: string[];

  @IsOptional()
  @ValidateNested()
  @Transform(({ value }) => plainToClass(TranscriptionDto, value))
  transcription: TranscriptionDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({ value: values }) => values.map(value => plainToClass(UsageExampleDto, value)))
  usageExamples: UsageExampleDto[];
}


