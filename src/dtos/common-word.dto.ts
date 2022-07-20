import { plainToClass, Transform, TransformFnParams, Type } from 'class-transformer';
import { IsString, IsArray, ArrayMinSize, IsOptional, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';

class UsageExampleDto {
  @IsString()
  sentence: string;

  @IsString()
  translation: string;

}

export class CreateCommonWordDto {
  @IsString()
  word: string;
 
  @IsArray()
  @ArrayMinSize(1)
  translation: string[];

  @IsOptional()
  @IsString()
  transcription: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({value: values}) => values.map(value => plainToClass(UsageExampleDto, value)))
  usageExamples: UsageExampleDto[];
}
 


export class UpdateCommonWordDto {
  @IsOptional()
  @IsString()
  word: string;
 
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  translation: string[];

  @IsOptional()
  @IsString()
  transcription: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({value: values}) => values.map(value => plainToClass(UsageExampleDto, value)))
  usageExamples: UsageExampleDto[];
}


