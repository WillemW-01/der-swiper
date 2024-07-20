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
  loadDeckTitle:
    "SELECT english, article, singular, plural FROM words JOIN (SELECT word_id FROM decks JOIN deck_mappings ON decks.id = deck_mappings.deck_id WHERE title = ?) ON id = word_id;",
  loadDeckId:
    "SELECT english, article, singular, plural FROM deck_mappings JOIN words ON word_id = id WHERE deck_id = ?;",
  loadHabenSein:
    "SELECT english, verb, perfectForm, usesSein FROM mappings_haben_sein JOIN haben_sein as b ON verb_id = b.id WHERE deck_id = ?;",
};

const shuffleArray = (array: WordArticle[]): WordArticle[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export function useDatabase() {
  const db = useSQLiteContext();

  async function loadProgressData(
    gameMode: keyof typeof gameModeSwitch & GameMode
  ): Promise<DeckData[]> {
    const targetDeck = gameModeSwitch[gameMode];
    const result = (await db.getAllAsync(`SELECT * FROM ${targetDeck}`)) as DeckData[];
    return result;
  }

  /*****************************************************************************
   *  DER DIE DAS SECTION
   ****************************************************************************/

  async function loadDeck(
    deck: string | number,
    shuffled: boolean = false
  ): Promise<WordArticle[]> {
    const query = typeof deck === "string" ? queries.loadDeckTitle : queries.loadDeckId;
    const words = (await db.getAllAsync(query, deck)) as WordArticle[];
    return shuffled ? shuffleArray(words) : words;
  }

  async function loadDecks() {
    const deckData = (await db.getAllAsync("SELECT * FROM decks")) as DeckData[];
    console.log("All decks: ", deckData);

    const decks = {} as { [key: string]: WordArticle[] };
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
    // console.log("Update result: ", result);
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

  /*****************************************************************************
   *  HABEN SEIN SECTION
   ****************************************************************************/

  async function loadHabenSein(deckId: number): Promise<WordVerb[]> {
    const words = (await db.getAllAsync(queries.loadHabenSein, deckId)) as WordVerb[];
    return words;
  }

  return {
    loadProgressData,
    loadDeck,
    loadDecks,
    updateDeck,
    resetDeckData,
    loadHabenSein,
  };
}
