export const conjugations = {
  haben: {
    ich: "habe",
    du: "hast",
    er: "hat",
    es: "hat",
    sie: "hat",
    wir: "haben",
    ihr: "habt",
    Sie: "haben",
  },
  sein: {
    ich: "bin",
    du: "bist",
    er: "ist",
    es: "ist",
    sie: "ist",
    wir: "sind",
    ihr: "seid",
    Sie: "sind",
  },
};

export type Person = "ich" | "du" | "er" | "es" | "sie" | "wir" | "ihr" | "Sie";

export const Persons = Object.keys(conjugations.haben) as Person[];

export const getRandomPerson = () => {
  return Persons[Math.floor(Math.random() * Persons.length)] as Person;
};
