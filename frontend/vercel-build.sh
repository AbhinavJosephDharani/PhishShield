#!/bin/bash
cd frontend
npm install
npm run build
cp -r dist/* ../frontend/dist/ 