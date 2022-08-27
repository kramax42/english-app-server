import { UserWord } from "./user-word.interface";

export enum WordLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  UNCATEGORIZED = 'uncategorized',
}

export interface UsageExample {
  _id: string;
  sentence: string | null;
  translation: string | null;
}

export interface Transcription {
  _id: string;
  uk: string | null;
  us: string | null;
}
export interface CommonWord {
  _id: string;
  word: string;
  transcription: Transcription;
  level: WordLevel;
  synonyms: string[];
  antonyms: string[];
  definitions: string[];
  translations: string[];
  usageExamples: UsageExample[];
}

export interface CommonWordResponseDto extends Omit<CommonWord, '_id' | 'usageExamples' | 'transcription'> {
  id: string;
  transcription: Pick<Transcription, 'us' | 'uk'> | null;
  usageExamples: Omit<UsageExample, "_id">[];
}

export interface CommonWordWithUserWordResponseDTO extends CommonWordResponseDto {
  userWord?: UserWord;
}

