import { Progress, Tier } from "@/components/DeckCard";
import { Word } from "./word";

export interface DeckData {
  id: number;
  progress: Progress;
  tier: Tier;
  title: string;
}
