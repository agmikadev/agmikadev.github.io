-- Portfolio content + anonymous visit counter.
-- JSON arrays are stored as TEXT to keep the schema small and portable.

CREATE TABLE IF NOT EXISTS missions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  role TEXT NOT NULL,
  summary TEXT NOT NULL,
  planet_ids TEXT NOT NULL DEFAULT '[]',
  highlights TEXT NOT NULL DEFAULT '[]',
  challenges TEXT NOT NULL DEFAULT '',
  impact TEXT NOT NULL DEFAULT '',
  ai_workflow TEXT,
  technologies TEXT NOT NULL DEFAULT '[]',
  links TEXT NOT NULL DEFAULT '[]',
  image_url TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  is_belt INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_missions_belt ON missions(is_belt);
CREATE INDEX IF NOT EXISTS idx_missions_featured ON missions(featured);
CREATE INDEX IF NOT EXISTS idx_missions_year ON missions(year);

CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  referrer TEXT,
  country TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_visits_created ON visits(created_at);
