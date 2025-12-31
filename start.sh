#!/bin/bash

# Quick start script for local development

echo ""
echo "================================================"
echo "  Harshana's Personal Website - Local Server"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "🚀 Starting the development server..."
echo ""
npm start
