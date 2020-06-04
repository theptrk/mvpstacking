CREATE TABLE IF NOT EXISTS api_responses (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  request_payload JSONB NOT NULL,
  response_payload JSONB NOT NULL
)