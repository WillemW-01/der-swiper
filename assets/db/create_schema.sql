CREATE TABLE words IF NOT EXISTS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  english TEXT,
  article TEXT,
  singular TEXT,
  plural TEXT
);

CREATE TABLE decks IF NOT EXISTS (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT UNIQUE,
  progress INTEGER,
  tier INTEGER
);

CREATE TABLE deck_mappings IF NOT EXISTS (
  word_id INTEGER,
  deck_id INTEGER,
  PRIMARY KEY (word_id, deck_id),
  FOREIGN KEY (word_id) REFERENCES words(id),
  FOREIGN KEY (deck_id) REFERENCES decks(id)
);
