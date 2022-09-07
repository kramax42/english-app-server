import { Min, IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetPageByLetterDto {
    @IsString()
    letter: string;

    @IsInt()
    @Transform(({ value }) => Number(value))
    @Min(1)
    limit: number; // Words count per page.
}