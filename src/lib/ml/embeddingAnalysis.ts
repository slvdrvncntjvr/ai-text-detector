export function analyzeEmbedding(embedding: Float32Array): number {
    // Statistical properties of the embedding
    const sum = embedding.reduce((a, b) => a + b, 0);
    const mean = sum / embedding.length;
    const variance = embedding.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / embedding.length;
    
    // Count zeroes (AI text often has specific patterns of zero values)
    let zeroCount = 0;
    embedding.forEach(value => {
      if (Math.abs(value) < 0.01) zeroCount++;
    });
    const zeroRatio = zeroCount / embedding.length;
    
    // Calculate positive/negative ratio
    let positiveCount = 0;
    embedding.forEach(value => {
      if (value > 0) positiveCount++;
    });
    const posRatio = positiveCount / embedding.length;
    
    // These values are tuned based on empirical observations
    const varianceScore = Math.min(1, Math.max(0, 0.8 - (variance * 2)));
    const zeroScore = Math.min(1, zeroRatio * 3);
    const posRatioScore = Math.min(1, Math.abs(posRatio - 0.5) * 4);
    
    return (varianceScore * 0.5) + (zeroScore * 0.3) + (posRatioScore * 0.2);
  }