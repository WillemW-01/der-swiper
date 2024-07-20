import { useDatabase } from "./useDatabase";
import { useLocalSearchParams } from "expo-router";
import { DeckData } from "@/types/decks";
import { GameMode } from "@/types/gameMode";
import { useState } from "react";

export function useGameCompletion() {
  const [deckNames, setDeckNames] = useState<DeckData[]>();

  const { title, allCorrect } = useLocalSearchParams();
  const dbMan = useDatabase();

  const updateData = async (gameMode: GameMode) => {
    console.log("Running update data");
    const deckData = await dbMan.loadProgressData(gameMode);

    if (allCorrect && title) {
      const lastTitle = title as string;
      const deck = deckData[deckData.findIndex((deck) => deck.title == lastTitle)];

      if (allCorrect) {
        console.log("All correct!");

        if (deck.tier == 4 && deck.progress == 4) {
          console.log("Max tier and progress!");
          return;
        } else {
          console.log(`Before tier: ${deck.tier}, progress: ${deck.progress}`);
          deck.progress += 1;
          if (deck.progress > 4) {
            deck.tier += deck.tier <= 3 ? 1 : 0;
            deck.progress = 0;
            console.log(`After tier: ${deck.tier}, progress: ${deck.progress}`);
          }
          console.log("Updating deck: ", deck);
          await dbMan.updateDeck(deck);
        }
      } else {
        console.log("Not all correct: ", allCorrect);
      }
    }

    setDeckNames(deckData);
  };

  return {
    updateData,
    deckNames,
  };
}
