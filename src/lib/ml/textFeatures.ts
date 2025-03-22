const AI_PATTERNS = [
    "as an ai language model",
    "i cannot provide",
    "i'm unable to",
    "as a language model",
    "i don't have personal",
    "i don't have the ability to",
    "i don't have opinions",
    "i don't have access to",
    "i cannot feel",
    "i do not have the capability",
    "i must inform you",
    "my purpose is to",
    "i'm an ai assistant",
    "i was created by",
    "i'm programmed to",
    "i'm just an ai",
    "i'm an artificial intelligence",
  ];
  
  export function checkPatterns(text: string): { patternScore: number, patternExplanations: string[] } {
    const lowerText = text.toLowerCase();
    let matches = 0;
    const matchedPatterns: string[] = [];
    
    AI_PATTERNS.forEach(pattern => {
      if (lowerText.includes(pattern)) {
        matches++;
        matchedPatterns.push(pattern);
      }
    });
    
    const patternScore = Math.min(0.95, matches * 0.15);
    const patternExplanations: string[] = [];
    
    if (matches > 0) {
      patternExplanations.push(`Found ${matches} AI-typical phrases like "${matchedPatterns[0]}".`);
    } else {
      patternExplanations.push("No explicit AI self-references detected.");
    }
    
    return { patternScore, patternExplanations };
  }