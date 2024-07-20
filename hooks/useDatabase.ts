import { useSQLiteContext } from "expo-sqlite";

import { DeckData } from "@/types/decks";
import { WordArticle, WordVerb } from "@/types/word";
import { GameMode } from "@/types/gameMode";

const gameModeSwitch = {
  derDieDas: "decks",
  habenSein: "decks_haben_sein",
  nomAkkDat: "decks_nom_akk_dat",
};

const queries = {
  load: {
    derDieDas:
      "SELECT english, article, singular, plural FROM deck_mappings JOIN words ON word_id = id WHERE deck_id = ?;",
    habenSein:
      "SELECT english, verb, perfectForm, usesSein FROM mappings_haben_sein JOIN haben_sein as b ON verb_id = b.id WHERE deck_id = ?;",
  },
};

const shuffleArray = (array: WordArticle[] | WordVerb[]): WordArticle[] | WordVerb[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export function useDatabase(gameMode: keyof typeof gameModeSwitch & GameMode) {
  const db = useSQLiteContext();

  async function loadProgressData(): Promise<DeckData[]> {
    const targetDeck = gameModeSwitch[gameMode];
    console.log(targetDeck);
    const result = (await db.getAllAsync(`SELECT * FROM ${targetDeck}`)) as DeckData[];
    return result;
  }

  async function updateDeck(deck: DeckData) {
    const targetDeck = gameModeSwitch[gameMode];
    const result = await db.runAsync(
      `UPDATE ${targetDeck} SET progress = ?, tier = ? WHERE title = ?`,
      [deck.progress, deck.tier, deck.title]
    );
  }

  async function loadDeck(deckId: number, shuffled: boolean = false) {
    const query = queries.load[gameMode as keyof typeof queries.load];
    const words = (await db.getAllAsync(query, deckId)) as WordArticle[];
    return shuffled ? shuffleArray(words) : words;
  }

  async function resetDeck() {
    const targetDeck = gameModeSwitch[gameMode];
    const deckData = (await db.getAllAsync(`SELECT * FROM ${targetDeck}`)) as DeckData[];
    for (let i = 0; i < deckData.length; i++) {
      const currentDeck = deckData[i];
      await db.runAsync(
        `UPDATE ${targetDeck} SET progress = 0, tier = 0 WHERE title = ?`,
        currentDeck.title
      );
    }
  }

  async function loadDecks() {
    const deckData = (await db.getAllAsync("SELECT * FROM decks")) as DeckData[];
    console.log("All decks: ", deckData);

    const decks = {} as { [key: string]: WordArticle[] | WordVerb[] };
    for (let i = 0; i < deckData.length; i++) {
      const currentDeck = deckData[i];
      const words = await loadDeck(currentDeck.id);
      decks[currentDeck.title] = words;
    }
    return decks;
  }

  return {
    loadProgressData,
    loadDeck,
    loadDecks,
    updateDeck,
    resetDeck,
  };
}
