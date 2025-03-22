import { TextAnalysisResult } from '@/types/analysis';
import {
  calculatePerplexity,
  calculateRepetition,
  calculateCoherence
} from '@/lib/utils/textProcessing';
import { checkPatterns } from '@/lib/ml/textFeatures';
import { analyzeEmbedding } from '@/lib/ml/embeddingAnalysis';
import { modelService } from './modelService';

class AnalyzerService {
  async analyzeText(text: string): Promise<TextAnalysisResult> {
    if (!text || text.trim().length < 20) {
      throw new Error("Text is too short for accurate analysis.");
    }

    // Pattern analysis
    const { patternScore, patternExplanations } = checkPatterns(text);
    
    // Statistical analysis
    const perplexityScore = calculatePerplexity(text);
    const repetitionScore = calculateRepetition(text);
    const coherenceScore = calculateCoherence(text);
    
    // Calculate statistical score
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words).size;
    const lexicalDiversity = uniqueWords / words.length;
    const diversityScore = 1 - Math.min(1, lexicalDiversity * 1.5);
    
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    const wordLengthScore = Math.min(1, Math.max(0, (avgWordLength - 4.5) / 1.5));
    
    const statisticalScore = (
      (perplexityScore * 0.3) + 
      (repetitionScore * 0.2) + 
      (coherenceScore * 0.3) + 
      (diversityScore * 0.1) + 
      (wordLengthScore * 0.1)
    );
    
    // Embedding analysis
    let embeddingScore: number | null = null;
    const embeddingExplanations: string[] = [];
    
    try {
      const embedding = await modelService.getEmbedding(text);
      if (embedding) {
        embeddingScore = analyzeEmbedding(embedding);
        embeddingExplanations.push(`Semantic analysis suggests ${Math.round(embeddingScore * 100)}% likelihood of AI authorship.`);
      }
    } catch (error) {
      console.error('Error in embedding analysis:', error);
      embeddingExplanations.push("Advanced semantic analysis unavailable.");
    }
    
    // Calculate final score with confidence
    const scores = [patternScore, statisticalScore];
    if (embeddingScore !== null) scores.push(embeddingScore);
    
    let overallScore: number;
    let confidence: number;
    
    if (embeddingScore !== null) {
      overallScore = (patternScore * 0.3) + (statisticalScore * 0.4) + (embeddingScore * 0.3);
      confidence = 0.85;
    } else {
      overallScore = (patternScore * 0.4) + (statisticalScore * 0.6);
      confidence = 0.7;
    }
    
    confidence *= Math.min(1, text.length / 500);
    
    const explanations = [
      ...patternExplanations,
      `Statistical analysis shows ${Math.round(statisticalScore * 100)}% probability of AI generation.`,
      `Text has ${perplexityScore > 0.6 ? 'low' : 'high'} linguistic variety, typical of ${perplexityScore > 0.6 ? 'AI' : 'human'} writing.`,
      `Text shows ${repetitionScore > 0.6 ? 'significant' : 'minimal'} repetitive patterns.`,
      `Sentence structure ${coherenceScore > 0.7 ? 'appears formulaic' : 'shows natural variation'}.`,
      ...embeddingExplanations
    ];
    
    return {
      overallScore,
      confidence,
      details: {
        patternScore,
        statisticalScore,
        embeddingScore,
        perplexityScore,
        coherenceScore,
        repetitionScore
      },
      explanation: explanations
    };
  }
}

export const analyzerService = new AnalyzerService();