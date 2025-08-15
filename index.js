// Vercel entry point for Meteor app
const path = require('path');

// Set environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.ROOT_URL = process.env.ROOT_URL || 'https://navak-dashboard.vercel.app';
process.env.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/demo';
process.env.DEMO_MODE = 'true';

// Set up environment for Meteor
process.chdir(path.join(__dirname, 'bundle', 'programs', 'server'));

// Start the Meteor app
require(path.join(__dirname, 'bundle', 'programs', 'server', 'boot.js'));