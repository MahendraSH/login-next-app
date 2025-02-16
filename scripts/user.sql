CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,          -- Auto-incremented ID (PostgreSQL uses SERIAL for auto-increment)
    name VARCHAR(255) NOT NULL,      -- Name of the user (required)
    email VARCHAR(255) NOT NULL UNIQUE,  -- Email of the user (required and must be unique)
    password VARCHAR(255) NOT NULL,  -- Password (required)
    role VARCHAR(50) NOT NULL       ,  -- Role (required)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Created timestamp
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP   -- Updated timestamp
);

-- Add index on email for faster lookups
CREATE INDEX idx_user_email ON "user" (email);
