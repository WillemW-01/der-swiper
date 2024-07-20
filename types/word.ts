export interface WordArticle {
  english: string;
  article: string;
  singular: string;
  plural: string;
}

export interface WordVerb {
  english: string;
  verb: string;
  perfectForm: string;
  usesSein: boolean;
}

export function isWordArticle(word: WordArticle | WordVerb): word is WordArticle {
  return (word as WordArticle).article !== undefined;
}

export function isWordVerb(word: WordArticle | WordVerb): word is WordVerb {
  return (word as WordVerb).verb !== undefined;
}
