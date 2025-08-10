#!/bin/bash

# TingNect Deployment Script
echo "🚀 Starting TingNect deployment..."

# Pull latest code
git pull origin main

# Build Docker image
docker-compose build

# Stop existing containers
docker-compose down

# Start new containers
docker-compose up -d

# Check if containers are running
docker-compose ps

echo "✅ Deployment completed!"
echo "🌐 Main site: https://tingnect.com"
echo "🎉 Event site: https://event.tingnect.com"
