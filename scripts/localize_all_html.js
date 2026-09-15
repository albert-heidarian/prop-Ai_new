const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFiles(full, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = getFiles(path.join(__dirname, '..'));

console.log(`Found ${htmlFiles.length} HTML files to localize.`);

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. html tag lang and dir
  content = content.replace(/<html[^>]*>/i, '<html lang="fa" dir="rtl">');

  // 2. Titles and metas
  content = content.replace(/<title>[^<]*<\/title>/i, '<title>پراپ — راهکارهای هوش مصنوعی</title>');
  content = content.replace(/content="Google Antigravity - Build the new way"/gi, 'content="پراپ - راهکارهای هوش مصنوعی برای کسب‌وکارهای آیندهنگر"');
  content = content.replace(/content="Google Antigravity"/gi, 'content="پراپ"');
  content = content.replace(/content="@antigravity"/gi, 'content="@prop_ai"');

  // 3. Ensure content-overrides.js is included
  if (!content.includes('content-overrides.js')) {
    content = content.replace('</body>', '  <script src="/content-overrides.js" defer></script>\n</body>');
  }

  // 4. Ensure official logo favicon and og:image
  content = content.replace(/assets\/image\/antigravity-logo\.png/g, '/logo.svg');
  if (content.includes('href="favicon.ico"')) {
    content = content.replace(
      '<link rel="icon" type="image/x-icon" href="favicon.ico">',
      '<link rel="icon" type="image/svg+xml" href="/logo-icon.svg">\n  <link rel="icon" type="image/png" href="/favicon.png">\n  <link rel="apple-touch-icon" href="/apple-touch-icon.png">'
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Localized ${path.relative(path.join(__dirname, '..'), filePath)}`);
}

console.log('--- All HTML files localized successfully ---');
