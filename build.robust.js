// build-robust.js
const path = require('path');

async function runBuild() {
  try {
    // Import the Next.js CLI
    const nextCli = require('next/dist/cli/next-build');
    
    // Call the CLI with the current directory
    await nextCli.nextBuild([process.cwd()]);
    
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

runBuild();