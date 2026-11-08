-- Per-planet perspectives for multi-area projects.
-- Stored as a JSON object keyed by planet id:
-- { "interactron": { "role": ..., "summary": ..., "highlights": [...] }, ... }

ALTER TABLE missions ADD COLUMN perspectives TEXT NOT NULL DEFAULT '{}';
