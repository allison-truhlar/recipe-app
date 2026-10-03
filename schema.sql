CREATE TABLE IF NOT EXISTS recipes (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  name               TEXT NOT NULL,
  url                TEXT,
  recipeIngredient   TEXT NOT NULL,   -- JSON array of strings
  recipeInstructions TEXT NOT NULL,   -- JSON array of strings
  created_at         TEXT DEFAULT CURRENT_TIMESTAMP
);
