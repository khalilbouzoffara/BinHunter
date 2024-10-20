#!/bin/bash

# Initialize database only for first time
flask db init || true

# Auto-generate migrations (if there are changes)
echo "Generating database migrations..."
flask db migrate -m "Auto migration" || echo "No new migrations needed."

# Apply database migrations
echo "Applying database migrations..."
flask db upgrade

# Start the Flask app
echo "Starting Flask app..."
exec "$@"
