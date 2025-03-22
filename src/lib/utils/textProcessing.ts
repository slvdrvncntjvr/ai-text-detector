export const getWordFrequency = (text: string): Map<string, number> => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequency = new Map<string, number>();
  
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });
  
  return frequency;
};

export const calculatePerplexity = (text: string): number => {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  if (words.length < 5) return 0.5;
  
  const frequency = getWordFrequency(text);
  const totalWords = words.length;
  
  let entropy = 0;
  frequency.forEach(count => {
    const probability = count / totalWords;
    entropy -= probability * Math.log2(probability);
  });
  
  return Math.min(1, Math.max(0, 1 - (entropy / 4.5)));
};

export const calculateRepetition = (text: string): number => {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  if (sentences.length < 3) return 0.5;
  
  const starters = sentences.map(s => s.split(' ').slice(0, 2).join(' ').toLowerCase());
  const starterFreq = new Map<string, number>();
  
  starters.forEach(starter => {
    starterFreq.set(starter, (starterFreq.get(starter) || 0) + 1);
  });
  
  let repeatScore = 0;
  starterFreq.forEach(count => {
    if (count > 1) {
      repeatScore += count / sentences.length;
    }
  });
  
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const phrases = new Map<string, number>();
  
  for (let i = 0; i < words.length - 2; i++) {
    const phrase = `${words[i]} ${words[i+1]} ${words[i+2]}`;
    phrases.set(phrase, (phrases.get(phrase) || 0) + 1);
  }
  
  let phraseRepeatScore = 0;
  phrases.forEach(count => {
    if (count > 1) {
      phraseRepeatScore += count / Math.max(1, words.length - 2);
    }
  });
  
  return Math.min(1, (repeatScore * 0.5) + (phraseRepeatScore * 0.5));
};

export const calculateCoherence = (text: string): number => {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  if (sentences.length < 3) return 0.5;
  
  const lengths = sentences.map(s => s.length);
  const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
  
  const normalizedVariance = Math.min(1, variance / 400);
  
  const connectingWords = ['however', 'therefore', 'thus', 'consequently', 'furthermore', 'additionally'];
  let connectingCount = 0;
  
  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    connectingWords.forEach(word => {
      if (lowerSentence.startsWith(word)) {
        connectingCount++;
      }
    });
  });
  
  const connectingScore = connectingCount / sentences.length;
  
  return 0.3 + (0.4 * (1 - normalizedVariance)) + (0.3 * connectingScore);
};