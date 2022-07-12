import { UsageExample } from '@interfaces/common-word.interface';
import { IsString, IsArray, ArrayMinSize, IsOptional } from 'class-validator';
 
export class CreateCommonWordDto {
  @IsString()
  public word: string;
 
  @IsArray()
  @ArrayMinSize(1)
  public translation: string[];

  @IsOptional()
  public transcription: string;

  @IsOptional()
  public usageExamples: UsageExample[];
 
}
 
export class UpdateCommonWordDto {
  @IsString()
  public word: string;
 
  @IsArray()
  @ArrayMinSize(1)
  public translation: string[];

  @IsOptional()
  public transcription: string;

  @IsOptional()
  public usageExamples: UsageExample[];
 
}