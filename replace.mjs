import fs from 'fs';
import path from 'path';

const searchRegexes = [
  { regex: /PromptHash Stellar/gi, replacement: 'Sellora' },
  { regex: /Prompt Hash Stellar/gi, replacement: 'Sellora' },
  { regex: /PromptHash/gi, replacement: 'Sellora' },
  { regex: /Prompt Hash/gi, replacement: 'Sellora' },
  { regex: /prompt-hash-stellar/gi, replacement: 'sellora' },
  { regex: /prompt-hash/gi, replacement: 'sellora' }
];

const ignoredDirs = ['.git', 'node_modules', '.yarn', 'dist', 'build', '.husky', 'playwright-report', 'test-results', '.vscode', '.github'];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!ignoredDirs.includes(file)) {
        processDirectory(fullPath);
      }
    } else {
      if (
        fullPath.endsWith('.md') ||
        fullPath.endsWith('.ts') ||
        fullPath.endsWith('.tsx') ||
        fullPath.endsWith('.js') ||
        fullPath.endsWith('.jsx') ||
        fullPath.endsWith('.html') ||
        fullPath.endsWith('.rs') ||
        fullPath.endsWith('.toml') ||
        fullPath.endsWith('.json') ||
        fullPath.endsWith('.yml') ||
        fullPath.endsWith('.yaml') ||
        fullPath.endsWith('.env.example')
      ) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        for (const { regex, replacement } of searchRegexes) {
          if (regex.test(content)) {
            content = content.replace(regex, replacement);
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

processDirectory('.');
