import { Progress, Tier } from "@/components/DeckCard";
import { WordArticle } from "./word";

export interface DeckData {
  id: number;
  progress: Progress;
  tier: Tier;
  title: string;
}
