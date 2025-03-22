export interface AnalysisResult {
    score: number;
    confidence: string;
    details: Record<string, number>;
  }
  
  export function analyzeText(text: string): AnalysisResult {
    // Get metrics for the text
    const metrics = {
      repetitionScore: calculateRepetitionScore(text),
      complexityScore: calculateComplexityScore(text),
      coherenceScore: calculateCoherenceScore(text),
      predictabilityScore: calculatePredictabilityScore(text),
    };
  
    // Calculate overall score (weighted average)
    const score = (
      metrics.repetitionScore * 0.3 +
      metrics.complexityScore * 0.3 +
      metrics.coherenceScore * 0.2 +
      metrics.predictabilityScore * 0.2
    );
  
    // Determine confidence level
    const confidence = score > 0.7 ? 'High' : score > 0.4 ? 'Medium' : 'Low';
  
    return {
      score,
      confidence,
      details: metrics,
    };
  }
  
  // Helper functions
  function calculateRepetitionScore(text: string): number {
    // AI text often has consistent patterns and repetitive structures
    // This is a simplified implementation
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    
    // Calculate repetition (higher values indicate more AI-like text)
    return Math.min(0.95, Math.max(0.05, 1 - (uniqueWords.size / words.length) * 1.5));
  }
  
  function calculateComplexityScore(text: string): number {
    // AI text often has consistent complexity patterns
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length <= 1) return 0.5;
    
    // Calculate sentence length variance (lower variance indicates more AI-like text)
    const lengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avg = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
    const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avg, 2), 0) / lengths.length;
    const normalizedVariance = Math.min(20, variance) / 20;
    
    // Lower variance = higher score (more likely AI)
    return 1 - normalizedVariance;
  }
  
  function calculateCoherenceScore(text: string): number {
    // AI text tends to be more coherent throughout
    // This is a simplified implementation
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    if (paragraphs.length <= 1) return 0.5;
    
    // For simplicity, use a random value influenced by text length
    // In a real implementation, you would analyze paragraph transitions
    const textLength = text.length;
    const seedValue = textLength % 100 / 100;
    
    return 0.4 + (seedValue * 0.4);
  }
  
  function calculatePredictabilityScore(text: string): number {
    // AI text often follows predictable patterns
    // This is a simplified implementation
    
    // Count common filler phrases that AI tends to use
    const fillerPhrases = [
      "in conclusion", "to summarize", "it is important to note", 
      "as mentioned earlier", "in other words", "for example",
      "in addition", "furthermore", "moreover", "however",
      "it is worth mentioning", "it should be noted"
    ];
    
    const lowerText = text.toLowerCase();
    const fillerCount = fillerPhrases.reduce((count, phrase) => {
      return count + (lowerText.includes(phrase) ? 1 : 0);
    }, 0);
    
    // Calculate normalized score
    return Math.min(0.9, Math.max(0.1, fillerCount / 8));
  }