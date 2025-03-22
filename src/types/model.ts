export type ModelStatus = 
  | 'notLoaded' 
  | 'loading' 
  | 'loaded' 
  | 'failed';

// We're not using this type directly anymore, but keeping it for reference
export interface UniversalSentenceEncoderModel {
  embed: (text: string | string[]) => Promise<any>;
}