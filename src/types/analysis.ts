export type TextAnalysisResult = {
  overallScore: number;
  confidence: number;
  details: {
    patternScore: number;
    statisticalScore: number;
    embeddingScore: number | null;
    perplexityScore: number;
    coherenceScore: number;
    repetitionScore: number;
  };
  explanation: string[];
};

export type AnalysisStatus = 
  | 'idle' 
  | 'loading' 
  | 'analyzing' 
  | 'modelLoading' 
  | 'success' 
  | 'error';