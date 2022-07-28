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