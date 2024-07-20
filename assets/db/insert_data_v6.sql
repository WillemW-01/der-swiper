CREATE TABLE IF NOT EXISTS decks_haben_sein (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT UNIQUE,
  progress INTEGER,
  tier INTEGER
);

INSERT INTO 
  decks_haben_sein (title, progress, tier)
VALUES
  ('Level 1', 0, 0),
  ('Level 2', 0, 0),
  ('Level 3', 0, 0),
  ('Level 4', 0, 0),
  ('Level 5', 0, 0);


CREATE TABLE IF NOT EXISTS mappings_haben_sein (
  verb_id INTEGER,
  deck_id INTEGER,
  PRIMARY KEY (verb_id, deck_id),
  FOREIGN KEY (verb_id) REFERENCES haben_sein(id),
  FOREIGN KEY (deck_id) REFERENCES decks_haben_sein(id)
);

INSERT INTO 
  mappings_haben_sein (verb_id, deck_id)
VALUES
 (1,  0),
 (2,  0),
 (3,  0),
 (4,  0),
 (5,  0),
 (6,  0),
 (7,  0),
 (8,  0),
 (9,  0),
 (10, 0),
 (11, 0),
 (12, 0),
 (13, 0),
 (14, 0),
 (15, 0),
 (16, 0),
 (17, 1),
 (18, 1),
 (19, 1),
 (20, 1),
 (21, 1),
 (22, 1),
 (23, 1),
 (24, 1),
 (25, 1),
 (26, 1),
 (27, 1),
 (28, 1),
 (29, 1),
 (30, 1),
 (31, 1),
 (32, 1),
 (33, 2),
 (34, 2),
 (35, 2),
 (36, 2),
 (37, 2),
 (38, 2),
 (39, 2),
 (40, 2),
 (41, 2),
 (42, 2),
 (43, 2),
 (44, 2),
 (45, 2),
 (46, 2),
 (47, 2),
 (48, 2),
 (49, 3),
 (50, 3),
 (51, 3),
 (52, 3),
 (53, 3),
 (54, 3),
 (55, 3),
 (56, 3),
 (57, 3),
 (58, 3),
 (59, 3),
 (60, 3),
 (61, 3),
 (62, 3),
 (63, 3),
 (64, 3),
 (65, 4),
 (66, 4),
 (67, 4),
 (68, 4),
 (69, 4),
 (70, 4),
 (71, 4),
 (72, 4),
 (73, 4),
 (74, 4),
 (75, 4),
 (76, 4),
 (77, 4),
 (78, 4),
 (79, 4),
 (80, 4);