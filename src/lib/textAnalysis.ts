// src/lib/textAnalysis.ts
export interface AnalysisResult {
  score: number;
  confidence: string;
  details: Record<string, number>;
  timestamp: number;
}

export function analyzeText(text: string): AnalysisResult {
  // Compute various linguistic metrics
  const metrics = {
    repetitionScore: calculateRepetitionScore(text),
    complexityScore: calculateComplexityScore(text),
    coherenceScore: calculateCoherenceScore(text),
    predictabilityScore: calculatePredictabilityScore(text),
    formalityScore: calculateFormalityScore(text),
  };

  // Calculate weighted score
  const score = (
    metrics.repetitionScore * 0.25 +
    metrics.complexityScore * 0.25 +
    metrics.coherenceScore * 0.2 +
    metrics.predictabilityScore * 0.15 +
    metrics.formalityScore * 0.15
  );

  // Determine confidence level
  const confidence = score > 0.7 ? "High" : score > 0.4 ? "Medium" : "Low";

  return {
    score,
    confidence,
    details: metrics,
    timestamp: Date.now(),
  };
}

function calculateRepetitionScore(text: string): number {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  if (words.length < 10) return 0.5;
  
  const uniqueWords = new Set(words);
  const uniqueRatio = uniqueWords.size / words.length;
  
  // Higher repetition (lower unique ratio) indicates AI text
  return Math.min(0.95, Math.max(0.05, 1 - uniqueRatio * 1.5));
}

function calculateComplexityScore(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length <= 1) return 0.5;
  
  // Calculate sentence length variance
  const lengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avg = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avg, 2), 0) / lengths.length;
  
  // Normalize variance (lower variance indicates more AI-like text)
  const normalizedVariance = Math.min(20, variance) / 20;
  return 1 - normalizedVariance;
}

function calculateCoherenceScore(text: string): number {
  // Count transition words (AI tends to use more)
  const transitionWords = [
    "therefore", "thus", "consequently", "as a result", "hence",
    "accordingly", "for this reason", "so", "due to", "because",
    "since", "moreover", "furthermore", "additionally", "in addition",
    "besides", "also", "likewise", "similarly", "in the same way"
  ];
  
  const lowerText = text.toLowerCase();
  let transitionCount = 0;
  
  transitionWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) transitionCount += matches.length;
  });
  
  // Normalize by text length (words)
  const wordCount = (lowerText.match(/\b\w+\b/g) || []).length;
  if (wordCount < 20) return 0.5;
  
  const transitionRatio = transitionCount / (wordCount / 100);
  return Math.min(0.9, Math.max(0.1, transitionRatio / 2));
}

function calculatePredictabilityScore(text: string): number {
  // Count common AI filler phrases
  const fillerPhrases = [
    "it is important to note", "it is worth mentioning", 
    "it should be noted", "it is essential to", "it is crucial to",
    "in conclusion", "to summarize", "as mentioned earlier",
    "in other words", "for example", "in the context of"
  ];
  
  const lowerText = text.toLowerCase();
  let fillerCount = 0;
  
  fillerPhrases.forEach(phrase => {
    if (lowerText.includes(phrase)) fillerCount++;
  });
  
  return Math.min(0.9, Math.max(0.1, fillerCount / 6));
}

function calculateFormalityScore(text: string): number {
  // AI text tends to be more formal
  const informalWords = [
    "stuff", "things", "kinda", "sorta", "yeah", "nah", "dunno", 
    "gonna", "wanna", "gotta", "ain't", "y'all", "folks", "awesome", 
    "cool", "super", "totally", "basically", "actually", "literally"
  ];
  
  const lowerText = text.toLowerCase();
  let informalCount = 0;
  
  informalWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) informalCount += matches.length;
  });
  
  // Calculate sentence complexity (longer sentences tend to be more formal)
  const sentences = lowerText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) return 0.5;
  
  const avgSentenceLength = lowerText.length / sentences.length;
  const normalizedLength = Math.min(avgSentenceLength / 25, 1);
  
  // Combine metrics (fewer informal words and longer sentences = more formal = more likely AI)
  const wordCount = (lowerText.match(/\b\w+\b/g) || []).length;
  if (wordCount < 20) return 0.5;
  
  const informalRatio = informalCount / (wordCount / 100);
  const informalScore = 1 - Math.min(informalRatio / 5, 1);
  
  return (informalScore * 0.7) + (normalizedLength * 0.3);
}