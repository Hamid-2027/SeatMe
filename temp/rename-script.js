// This script will generate the mapping of current filenames to kebab-case versions
const fs = require('fs');
const path = require('path');

// Function to convert PascalCase/camelCase to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
}

// Function to process a directory and generate rename mapping
function processDirectory(dirPath, mappings = {}) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    
    if (file.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(fullPath, mappings);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      // Skip files that are already in kebab-case
      if (file.name.includes('-')) continue;
      
      const extension = path.extname(file.name);
      const baseName = path.basename(file.name, extension);
      
      // Convert to kebab-case
      const kebabName = toKebabCase(baseName) + extension;
      
      // Store the mapping
      mappings[fullPath] = path.join(path.dirname(fullPath), kebabName);
    }
  }
  
  return mappings;
}

// Process components and screens directories
const componentsDir = '/Users/mac/apps/seatme/src/components';
const screensDir = '/Users/mac/apps/seatme/src/screens';

const mappings = {
  ...processDirectory(componentsDir),
  ...processDirectory(screensDir)
};

// Write the mappings to a file
fs.writeFileSync('/Users/mac/apps/seatme/temp/rename-mappings.json', JSON.stringify(mappings, null, 2));

console.log(`Generated rename mappings for ${Object.keys(mappings).length} files.`);
