const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = content
    .replace(/آینده‌نگر/g, 'آینده نگر')
    .replace(/آینده نگر/g, 'آینده نگر');
  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`✓ Updated ${file}`);
  }
});

// Also update scripts/localize_all_html.js
if (fs.existsSync('scripts/localize_all_html.js')) {
  let script = fs.readFileSync('scripts/localize_all_html.js', 'utf8');
  let updatedScript = script
    .replace(/آینده‌نگر/g, 'آینده نگر')
    .replace(/آینده نگر/g, 'آینده نگر');
  fs.writeFileSync('scripts/localize_all_html.js', updatedScript, 'utf8');
  console.log('✓ Updated scripts/localize_all_html.js');
}

console.log('Finished updating آینده نگر across all HTML files.');
