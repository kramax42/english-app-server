import { IUserWord } from "./user-word.interface";

export enum WordLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  UNCATEGORIZED = 'uncategorized',
}

export interface IUsageExample {
  _id: string;
  sentence: string | null;
  translation: string | null;
}

export interface ITranscription {
  _id: string;
  uk: string | null;
  us: string | null;
}

export interface IMeaning {
  pos: string; // Part of speech.
  level: WordLevel;
  synonyms: string[];
  antonyms: string[];
  definitions: string[];
  translations: string[];
  usageExamples: IUsageExample[];

}
export interface ICommonWord {
  _id: string;
  word: string;
  transcription: ITranscription;
  meanings: IMeaning[];
}


export interface IMeaningResponseDto extends Omit<IMeaning, '_id' | 'usageExamples'> {
  usageExamples: Omit<IUsageExample, "_id">[];
}
export interface ICommonWordResponseDto extends Omit<ICommonWord, '_id' | 'meanings' | 'transcription'> {
  id: string;
  meanings: IMeaningResponseDto[];
  transcription: Pick<ITranscription, 'us' | 'uk'>;

}

export interface ICommonWordWithUserWordResponseDto extends ICommonWordResponseDto {
  userWord?: IUserWord;
}

