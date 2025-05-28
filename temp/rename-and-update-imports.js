// This script will rename files to kebab-case and update all imports in the codebase
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load the rename mappings
const mappings = JSON.parse(fs.readFileSync('/Users/mac/apps/seatme/temp/rename-mappings.json', 'utf8'));

// Get all TypeScript/TSX files in the project
const getAllTsFiles = () => {
  try {
    const result = execSync('find /Users/mac/apps/seatme/src -type f -name "*.ts" -o -name "*.tsx"', { encoding: 'utf8' });
    return result.split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error finding TypeScript files:', error);
    return [];
  }
};

// Function to update imports in a file
const updateImportsInFile = (filePath, oldToNewMap) => {
  try {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // For each mapping, update any import statements
    for (const [oldPath, newPath] of Object.entries(oldToNewMap)) {
      const oldBaseName = path.basename(oldPath, path.extname(oldPath));
      const newBaseName = path.basename(newPath, path.extname(newPath));
      
      // Skip if the file being processed is the old file that will be renamed
      if (filePath === oldPath) continue;
      
      // Update relative imports (this is a simplified approach and may need refinement)
      const oldRelativePath = path.relative(path.dirname(filePath), path.dirname(oldPath));
      const newRelativePath = path.relative(path.dirname(filePath), path.dirname(newPath));
      
      // Handle different import patterns
      const importPatterns = [
        // Standard import with quotes
        new RegExp(`from\\s+['"](\\.\\.?\\/.*?\\/)${oldBaseName}['"]`, 'g'),
        // Import with path alias (if used in the project)
        new RegExp(`from\\s+['"](@.*?\\/)${oldBaseName}['"]`, 'g'),
        // Import with just the component name (if in same directory)
        new RegExp(`from\\s+['"]\\.\\/+${oldBaseName}['"]`, 'g'),
        // Import with deeper path
        new RegExp(`from\\s+['"](\\.\\.\\/.*?\\/)${oldBaseName}['"]`, 'g'),
      ];
      
      for (const pattern of importPatterns) {
        if (pattern.test(content)) {
          content = content.replace(pattern, (match, prefix) => {
            modified = true;
            return `from '${prefix}${newBaseName}'`;
          });
        }
      }
      
      // Also handle direct imports of the file (without destructuring)
      const directImportPattern = new RegExp(`import\\s+${oldBaseName}\\s+from\\s+['"](.+?)['"]`, 'g');
      if (directImportPattern.test(content)) {
        content = content.replace(directImportPattern, (match, importPath) => {
          // Only replace if the import path points to the file we're renaming
          if (importPath.endsWith(oldBaseName) || importPath.endsWith(`${oldBaseName}.tsx`) || importPath.endsWith(`${oldBaseName}.ts`)) {
            modified = true;
            const newImportPath = importPath.replace(oldBaseName, newBaseName);
            return `import ${oldBaseName} from '${newImportPath}'`;
          }
          return match;
        });
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error updating imports in ${filePath}:`, error);
  }
};

// Function to rename files according to the mapping
const renameFiles = async () => {
  // Create a map of old base names to new base names (for import updates)
  const oldToNewBaseNames = {};
  for (const [oldPath, newPath] of Object.entries(mappings)) {
    const oldBaseName = path.basename(oldPath, path.extname(oldPath));
    const newBaseName = path.basename(newPath, path.extname(newPath));
    oldToNewBaseNames[oldBaseName] = newBaseName;
  }
  
  // Update imports in all TypeScript files
  const allTsFiles = getAllTsFiles();
  for (const file of allTsFiles) {
    updateImportsInFile(file, mappings);
  }
  
  // Rename the files
  for (const [oldPath, newPath] of Object.entries(mappings)) {
    try {
      // Ensure the target directory exists
      const targetDir = path.dirname(newPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Rename the file
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldPath} -> ${newPath}`);
      } else {
        console.warn(`File not found: ${oldPath}`);
      }
    } catch (error) {
      console.error(`Error renaming ${oldPath} to ${newPath}:`, error);
    }
  }
};

// Execute the rename operation
renameFiles().then(() => {
  console.log('File renaming and import updates completed.');
}).catch(error => {
  console.error('Error during renaming process:', error);
});
