import { WordLevel } from '@/interfaces/common-word.interface';
import { IsWordLevel } from '@/utils/validators/word-levell.validator copy';
import { plainToClass, Transform } from 'class-transformer';
import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';


class TranscriptionDto {
  @IsOptional()
  @IsString()
  uk: string;

  @IsOptional()
  @IsString()
  us: string;
}

class MeaningDto {
  @IsOptional()
  @IsString()
  pos: string;

  @IsOptional()
  @IsString()
  definition: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  translations: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  usageExamples: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  synonyms: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  antonyms: string[];

  @IsWordLevel({
    message: "Incorrect word level."
  })
  level: WordLevel;
}


export class CreateCommonWordDto {
  @IsString()
  word: string;

  @IsString()
  normalizedWord: string;

  @IsOptional()
  @ValidateNested()
  @Transform(({ value }) => plainToClass(TranscriptionDto, value))
  transcription: TranscriptionDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({ value: values }) => values.map(value => plainToClass(MeaningDto, value)))
  meanings: MeaningDto[];
}



export class UpdateCommonWordDto {
  @IsOptional()
  @IsString()
  word: string;

  @IsString()
  normalizedWord: string;

  @IsOptional()
  @ValidateNested()
  @Transform(({ value }) => plainToClass(TranscriptionDto, value))
  transcription: TranscriptionDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({ value: values }) => values.map(value => plainToClass(MeaningDto, value)))
  meanings: MeaningDto[];
}


