export const table = {
  derDieDas: {
    left: "der",
    right: "die",
    up: "das",
    down: "error",
  },
  habenSein: {
    left: "haben",
    right: "sein",
    up: "error",
    down: "error",
  },
  nomAkkDat: {
    left: "akk",
    right: "dat",
    up: "wech",
    down: "error",
  },
};

export interface SwitchTable {
  left: string;
  right: string;
  up: string;
  down: string;
}
