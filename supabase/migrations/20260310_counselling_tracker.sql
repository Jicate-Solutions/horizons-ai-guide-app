-- Counselling Application Tracker
-- Stores which steps each student has completed
-- n8n reads this table daily to send deadline reminders

CREATE TABLE IF NOT EXISTS counselling_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  phone TEXT,
  full_name TEXT,
  counselling_id TEXT NOT NULL, -- 'tnea', 'neet-tn', 'josaa', 'tnau'
  completed_steps TEXT[] DEFAULT '{}', -- array of step IDs like ['tnea-1', 'tnea-2']
  total_steps INTEGER DEFAULT 0,
  is_complete BOOLEAN DEFAULT false,
  last_reminder_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, counselling_id)
);

-- Index for n8n daily query
CREATE INDEX IF NOT EXISTS idx_tracker_incomplete ON counselling_tracker(is_complete) WHERE is_complete = false;
CREATE INDEX IF NOT EXISTS idx_tracker_email ON counselling_tracker(email);

-- RLS policies
ALTER TABLE counselling_tracker ENABLE ROW LEVEL SECURITY;

-- Users can read/write their own tracker data
CREATE POLICY "Users can view own tracker" ON counselling_tracker
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tracker" ON counselling_tracker
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tracker" ON counselling_tracker
  FOR UPDATE USING (auth.uid() = user_id);

-- Service role (n8n) can read all trackers for reminders
CREATE POLICY "Service can read all trackers" ON counselling_tracker
  FOR SELECT USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_tracker_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  NEW.is_complete = (array_length(NEW.completed_steps, 1) >= NEW.total_steps AND NEW.total_steps > 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tracker_updated
  BEFORE UPDATE ON counselling_tracker
  FOR EACH ROW
  EXECUTE FUNCTION update_tracker_timestamp();
