import { WordLevel } from '../interfaces/common-word.interface';
declare class TranscriptionDto {
    uk: string;
    us: string;
}
declare class MeaningDto {
    pos: string;
    definition: string;
    translations: string[];
    usageExamples: string[];
    synonyms: string[];
    antonyms: string[];
    level: WordLevel;
}
export declare class CreateCommonWordDto {
    word: string;
    transcription: TranscriptionDto;
    meanings: MeaningDto[];
}
export declare class UpdateCommonWordDto {
    word: string;
    transcription: TranscriptionDto;
    meanings: MeaningDto[];
}
export {};
