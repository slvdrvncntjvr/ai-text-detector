// build-next.js
const { execSync } = require('child_process');
const path = require('path');

try {
  // Get the path to the next.js dist directory
  const nextDist = path.resolve(__dirname, 'node_modules', 'next', 'dist');
  
  // Use process.argv to pass any additional arguments
  process.argv[1] = path.join(nextDist, 'bin', 'next');
  process.argv[2] = 'build';
  
  // Execute the next.js CLI directly
  require(path.join(nextDist, 'bin', 'next'));
} catch (error) {
  console.error('Build error:', error);
  process.exit(1);
}