#!/usr/bin/env node

// Deployment script to build and serve the full application
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting deployment process...');

// Function to run a command and wait for it to complete
function runCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    console.log(`🔧 Running: ${command} in ${cwd}`);
    
    const child = spawn(command, { 
      cwd,
      shell: true,
      stdio: 'inherit'
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Main deployment function
async function deploy() {
  try {
    // Build the frontend
    console.log('📦 Building frontend...');
    await runCommand('npm run build', path.join(__dirname, 'frontend'));
    console.log('✅ Frontend build completed');
    
    // Start the backend server (which serves the frontend)
    console.log('🚀 Starting backend server...');
    await runCommand('node server.js', path.join(__dirname, 'backend'));
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run deployment
deploy();