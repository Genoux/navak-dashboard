# Navak Dashboard Deployment Guide

## ✅ Super Simple Deployment (No Database Needed!)

This demo now runs completely client-side with fake data - no database or backend setup required!

## Option 1: Vercel (Recommended - 1-Click Deploy)

### Step 1: Deploy to Vercel
1. Fork this repository to your GitHub
2. Go to [Vercel](https://vercel.com) and connect your GitHub
3. Import the `navak-dashboard` repository
4. Hit Deploy - that's it!

The app automatically runs in demo mode with realistic fake data.

## Option 2: Netlify (Alternative)

1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Deploy with default settings

## Option 3: GitHub Pages (Free Static Hosting)

1. In your repository settings, enable GitHub Pages
2. Set source to main branch
3. Access via `https://yourusername.github.io/navak-dashboard`

## Demo Features

The deployed version will:
- ✅ Show realistic fake BPM data with live updates
- ✅ Simulate users assigned to lanterns with heartbeat colors
- ✅ Display all components (lanterns, stations, servers, areas)
- ✅ Show demo popup explaining it's a showcase
- ✅ Work completely offline - no external dependencies
- ✅ Responsive design for desktop and mobile

## Environment Variables (Optional)

```
NODE_ENV=production
ROOT_URL=your_deployed_url
DEMO_MODE=true
```

## Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/navak-dashboard.git
cd navak-dashboard

# Install dependencies
meteor npm install

# Run in demo mode
npm start
```

## What's Different in Demo Mode

- All data is client-side fake data (no database)
- BPM values update realistically every 2 seconds
- External connections (MQTT, ping) are disabled
- Demo popup shows on first load
- Perfect for showcasing the project concept