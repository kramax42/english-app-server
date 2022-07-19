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
  public word: string;
 
  @IsArray()
  @ArrayMinSize(1)
  public translation: string[];

  @IsOptional()
  @IsString()
  public transcription: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({value: values}) => values.map(value => plainToClass(UsageExampleDto, value)))
  public usageExamples: UsageExampleDto[];
}
 


export class UpdateCommonWordDto {
  @IsString()
  public word: string;
 
  @IsArray()
  @ArrayMinSize(1)
  public translation: string[];

  @IsOptional()
  @IsString()
  public transcription: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // Additional validating for correct nested DTO field.
  @Transform(({value: values}) => values.map(value => plainToClass(UsageExampleDto, value)))
  public usageExamples: UsageExampleDto[];
}


