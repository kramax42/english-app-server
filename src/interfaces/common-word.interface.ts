import { UserWord, WordStudyStatus } from "./user-word.interface";

export interface UsageExample {
  _id: string;
  sentence: string;
  translation: string;
}

export interface Transcription {
  _id: string;
  uk: string;
  us: string;
}
export interface CommonWord {
  _id: string;
  word: string;
  transcription: Transcription;
  definitions: string[];
  translations: string[];
  usageExamples: UsageExample[];
}

export interface CommonWordResponseDto extends Omit<CommonWord, '_id' | 'usageExamples'> {
  id: string;
  word: string;
  transcription: Transcription;
  definitions: string[];
  translations: string[];
  usageExamples: Omit<UsageExample, "_id">[];
}

export interface CommonWordWithUserWordResponseDTO extends CommonWordResponseDto {
  userWord?: UserWord;
}

