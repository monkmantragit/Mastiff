#!/usr/bin/env node

/**
 * Fix Build Errors
 * Quickly fixes common linting errors without disturbing functionality
 */

const fs = require('fs');
const path = require('path');

function fixFile(filePath, fixes) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    fixes.forEach(fix => {
      content = content.replace(fix.find, fix.replace);
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Fix unused imports
const unusedImportFixes = [
  {
    file: 'src/app/blog/[slug]/page.tsx',
    fixes: [
      { find: /import.*ArrowLeft.*from.*lucide-react.*\n/, replace: '' }
    ]
  },
  {
    file: 'src/app/blog/page.tsx', 
    fixes: [
      { find: /, User/, replace: '' }
    ]
  },
  {
    file: 'src/app/clients/page.tsx',
    fixes: [
      { find: /import.*Sparkles.*from.*lucide-react.*\n/, replace: '' }
    ]
  },
  {
    file: 'src/app/services/[slug]/page.tsx',
    fixes: [
      { find: /import.*Play.*from.*lucide-react.*\n/, replace: '' }
    ]
  },
  {
    file: 'src/lib/directus.ts',
    fixes: [
      { find: /, staticToken/, replace: '' }
    ]
  }
];

// Fix apostrophes
const apostropheFixes = [
  {
    file: 'src/app/about/page.tsx',
    fixes: [
      { find: /We've/g, replace: "We&apos;ve" },
      { find: /doesn't/g, replace: "doesn&apos;t" },
      { find: /we're/g, replace: "we&apos;re" },
      { find: /that's/g, replace: "that&apos;s" },
      { find: /client's/g, replace: "client&apos;s" }
    ]
  },
  {
    file: 'src/app/contact/page.tsx',
    fixes: [
      { find: /We're/g, replace: "We&apos;re" },
      { find: /We'll/g, replace: "We&apos;ll" },
      { find: /Let's/g, replace: "Let&apos;s" },
      { find: /you're/g, replace: "you&apos;re" }
    ]
  },
  {
    file: 'src/app/page.tsx',
    fixes: [
      { find: /We're/g, replace: "We&apos;re" },
      { find: /We've/g, replace: "We&apos;ve" },
      { find: /that's/g, replace: "that&apos;s" },
      { find: /doesn't/g, replace: "doesn&apos;t" },
      { find: /you're/g, replace: "you&apos;re" }
    ]
  },
  {
    file: 'src/app/services/page.tsx',
    fixes: [
      { find: /We're/g, replace: "We&apos;re" },
      { find: /that's/g, replace: "that&apos;s" },
      { find: /you're/g, replace: "you&apos;re" },
      { find: /company's/g, replace: "company&apos;s" }
    ]
  },
  {
    file: 'src/app/thank-you/page.tsx',
    fixes: [
      { find: /We'll/g, replace: "We&apos;ll" }
    ]
  }
];

// Add alt prop fix
const imageFixes = [
  {
    file: 'src/app/portfolio/page.tsx',
    fixes: [
      { find: /<Image([^>]*?)src=([^>]*?)className=([^>]*?)\/>/g, replace: '<Image$1src=$2alt=""$3className=$4/>' }
    ]
  }
];

console.log('🔧 Fixing build errors...\n');

// Apply unused import fixes
unusedImportFixes.forEach(item => {
  fixFile(item.file, item.fixes);
});

// Apply apostrophe fixes  
apostropheFixes.forEach(item => {
  fixFile(item.file, item.fixes);
});

// Apply image fixes
imageFixes.forEach(item => {
  fixFile(item.file, item.fixes);
});

console.log('\n🎉 Build error fixes completed!');