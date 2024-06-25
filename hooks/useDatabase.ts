import { useSQLiteContext } from "expo-sqlite";

import { DeckData } from "@/types/decks";
import { Word } from "@/types/word";

const queries = {
  loadDeckTitle:
    "SELECT english, article, singular, plural FROM words JOIN (SELECT word_id FROM decks JOIN deck_mappings ON decks.id = deck_mappings.deck_id WHERE title = ?) ON id = word_id;",
  loadDeckId:
    "SELECT english, article, singular, plural FROM deck_mappings JOIN words ON word_id = id WHERE deck_id = ?;",
};

export function useDatabase() {
  const db = useSQLiteContext();

  async function loadProgressData(): Promise<DeckData[]> {
    const result = (await db.getAllAsync("SELECT * FROM decks")) as DeckData[];
    console.log("All deckdata: ", result);
    return result;
  }

  async function loadDeck(deck: string | number): Promise<Word[]> {
    const query = typeof deck === "string" ? queries.loadDeckTitle : queries.loadDeckId;
    const words = (await db.getAllAsync(query, deck)) as Word[];
    return words;
  }

  async function loadDecks() {
    const deckData = (await db.getAllAsync("SELECT * FROM decks")) as DeckData[];
    console.log("All decks: ", deckData);

    const decks = {} as { [key: string]: Word[] };
    for (let i = 0; i < deckData.length; i++) {
      const currentDeck = deckData[i];
      const words = await loadDeck(currentDeck.id);
      decks[currentDeck.title] = words;
    }
    return decks;
  }

  async function updateDeck(deck: DeckData) {
    const result = await db.runAsync(
      "UPDATE decks SET progress = ?, tier = ? WHERE title = ?",
      [deck.progress, deck.tier, deck.title]
    );
    console.log("Update result: ", result);
  }

  async function resetDeckData() {
    const deckData = (await db.getAllAsync("SELECT * FROM decks")) as DeckData[];
    for (let i = 0; i < deckData.length; i++) {
      const currentDeck = deckData[i];
      await db.runAsync(
        "UPDATE decks SET progress = 0, tier = 0 WHERE title = ?",
        currentDeck.title
      );
    }
  }

  return {
    loadProgressData,
    loadDeck,
    loadDecks,
    updateDeck,
    resetDeckData,
  };
}
