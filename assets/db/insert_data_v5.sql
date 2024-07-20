CREATE TABLE IF NOT EXISTS haben_sein  (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  english TEXT,
  verb TEXT,
  perfectForm TEXT,
  usesSein BOOLEAN,
  deck_num INTEGER
);

INSERT INTO haben_sein (english, verb, perfectForm, usesSein, deck_num) VALUES
-- Deck 0
('to be', 'sein', 'gewesen', 1, 0),
('to become', 'werden', 'geworden', 1, 0),
('to come', 'kommen', 'gekommen', 1, 0),
('to go', 'gehen', 'gegangen', 1, 0),
('to drive/go', 'fahren', 'gefahren', 1, 0),
('to stay', 'bleiben', 'geblieben', 1, 0),
('to happen', 'passieren', 'passiert', 1, 0),
('to fall', 'fallen', 'gefallen', 1, 0),
('to have', 'haben', 'gehabt', 0, 0),
('to be (auxiliary)', 'sein', 'gewesen', 0, 0),
('to make/do', 'machen', 'gemacht', 0, 0),
('to say', 'sagen', 'gesagt', 0, 0),
('to give', 'geben', 'gegeben', 0, 0),
('to come (transitive)', 'kommen', 'gekommen', 0, 0),
('to see', 'sehen', 'gesehen', 0, 0),
('to go (transitive)', 'gehen', 'gegangen', 0, 0),

-- Deck 1
('to fly', 'fliegen', 'geflogen', 1, 1),
('to arrive', 'ankommen', 'angekommen', 1, 1),
('to get up', 'aufstehen', 'aufgestanden', 1, 1),
('to run/walk', 'laufen', 'gelaufen', 1, 1),
('to fall asleep', 'einschlafen', 'eingeschlafen', 1, 1),
('to die', 'sterben', 'gestorben', 1, 1),
('to happen', 'geschehen', 'geschehen', 1, 1),
('to emerge', 'entstehen', 'entstanden', 1, 1),
('to take', 'nehmen', 'genommen', 0, 1),
('to find', 'finden', 'gefunden', 0, 1),
('to speak', 'sprechen', 'gesprochen', 0, 1),
('to think', 'denken', 'gedacht', 0, 1),
('to know', 'wissen', 'gewusst', 0, 1),
('to eat', 'essen', 'gegessen', 0, 1),
('to hear', 'hören', 'gehört', 0, 1),
('to work', 'arbeiten', 'gearbeitet', 0, 1),

-- Deck 2
('to grow', 'wachsen', 'gewachsen', 1, 2),
('to travel', 'reisen', 'gereist', 1, 2),
('to swim', 'schwimmen', 'geschwommen', 1, 2),
('to follow', 'folgen', 'gefolgt', 1, 2),
('to wake up', 'aufwachen', 'aufgewacht', 1, 2),
('to move house', 'umziehen', 'umgezogen', 1, 2),
('to depart', 'abfahren', 'abgefahren', 1, 2),
('to get off/out', 'aussteigen', 'ausgestiegen', 1, 2),
('to believe', 'glauben', 'geglaubt', 0, 2),
('to learn', 'lernen', 'gelernt', 0, 2),
('to play', 'spielen', 'gespielt', 0, 2),
('to understand', 'verstehen', 'verstanden', 0, 2),
('to read', 'lesen', 'gelesen', 0, 2),
('to write', 'schreiben', 'geschrieben', 0, 2),
('to help', 'helfen', 'geholfen', 0, 2),
('to ask', 'fragen', 'gefragt', 0, 2),

-- Deck 3
('to get in', 'einsteigen', 'eingestiegen', 1, 3),
('to encounter', 'begegnen', 'begegnet', 1, 3),
('to jump', 'springen', 'gesprungen', 1, 3),
('to climb/rise', 'steigen', 'gestiegen', 1, 3),
('to disappear', 'verschwinden', 'verschwunden', 1, 3),
('to return', 'zurückkehren', 'zurückgekehrt', 1, 3),
('to succeed', 'gelingen', 'gelungen', 1, 3),
('to move out', 'ausziehen', 'ausgezogen', 1, 3),
('to buy', 'kaufen', 'gekauft', 0, 3),
('to bring', 'bringen', 'gebracht', 0, 3),
('to drink', 'trinken', 'getrunken', 0, 3),
('to know (be acquainted with)', 'kennen', 'gekannt', 0, 3),
('to love', 'lieben', 'geliebt', 0, 3),
('to need', 'brauchen', 'gebraucht', 0, 3),
('to begin', 'beginnen', 'begonnen', 0, 3),
('to hold/stop', 'halten', 'gehalten', 0, 3),

-- Deck 4
('to crash', 'abstürzen', 'abgestürzt', 1, 4),
('to sink', 'sinken', 'gesunken', 1, 4),
('to drown', 'ertrinken', 'ertrunken', 1, 4),
('to awaken', 'erwachen', 'erwacht', 1, 4),
('to glide', 'gleiten', 'geglitten', 1, 4),
('to crawl', 'kriechen', 'gekrochen', 1, 4),
('to land', 'landen', 'gelandet', 1, 4),
('to fail', 'misslingen', 'misslungen', 1, 4),
('to call', 'rufen', 'gerufen', 0, 4),
('to sleep', 'schlafen', 'geschlafen', 0, 4),
('to look', 'schauen', 'geschaut', 0, 4),
('to open', 'öffnen', 'geöffnet', 0, 4),
('to pay', 'bezahlen', 'bezahlt', 0, 4),
('to cook', 'kochen', 'gekocht', 0, 4),
('to study', 'studieren', 'studiert', 0, 4),
('to laugh', 'lachen', 'gelacht', 0, 4);