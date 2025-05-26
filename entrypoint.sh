#!/bin/sh

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
until nc -z database 5432; do
  sleep 1
done

echo "Running database migrations..."
npx prisma migrate deploy

echo "Generating Prisma client..."
npx prisma generate

exec "$@"
