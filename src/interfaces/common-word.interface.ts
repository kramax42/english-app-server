import { WordStudyStatus } from "./user-word.interface";

export interface UsageExample {
  sentence: string;
  translation: string;
}
export interface CommonWord {
  word: string;
  transcription: string;
  definitions: string[];
  translations: string[];
  usageExamples: UsageExample[];
}

export interface CommonWordWithUserStudyStatusResponseDTO extends CommonWord {
  id: string;
  userStudyStatus: WordStudyStatus;
}