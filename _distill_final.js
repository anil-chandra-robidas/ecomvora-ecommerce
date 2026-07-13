const fs = require('fs');
const dbPath = 'C:\\Users\\user\\.local\\share\\mimocode\\mimocode.db';
const buf = fs.readFileSync(dbPath);
const text = buf.toString('utf8');

// Find all session IDs that reference ecomvora
console.log('=== Sessions referencing ecomvora ===');
const ecomvoraIdx = [];
let searchStart = 0;
while (true) {
  const idx = text.indexOf('ecomvora', searchStart);
  if (idx === -1) break;
  ecomvoraIdx.push(idx);
  searchStart = idx + 1;
}
console.log(`Found ${ecomvoraIdx.length} mentions of ecomvora`);

// For each mention, show nearby session IDs
const sesRegex = /ses_[a-f0-9]{8,}[a-zA-Z0-9]+/g;
ecomvoraIdx.forEach(offset => {
  const context = text.substring(Math.max(0, offset - 200), Math.min(text.length, offset + 200));
  let m;
  const sessions = [];
  while ((m = sesRegex.exec(context)) !== null) {
    if (!sessions.includes(m[0])) sessions.push(m[0]);
  }
  if (sessions.length > 0) {
    console.log(`  offset ${offset}: sessions: ${sessions.join(', ')}`);
  }
});

// Look for repeated design iteration patterns in user messages
console.log('\n=== Design iteration patterns ===');
const designPhrases = [
  'not look good', 'not look goods', 'make it more', 'looks good', 
  'hero area', 'hero section', 'add more section', 'more section',
  'make all page', 'improve', 'not use black', 'light theme',
  'consistent', 'reusable', 'breadcrumb', 'PageHero',
  'dark theme', 'glass morphism', 'gradient', 'animated'
];
designPhrases.forEach(phrase => {
  const regex = new RegExp(phrase, 'gi');
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.push(m.index);
  }
  if (matches.length > 0) {
    console.log(`  "${phrase}": ${matches.length} occurrences`);
  }
});

// Look for repeated project setup patterns
console.log('\n=== Project setup patterns ===');
const setupPhrases = [
  'create-next-app', 'npm init', 'npm install', 'npm run dev', 
  'npm run build', 'git init', 'git add', 'git commit',
  'tailwind.config', 'globals.css', 'layout.tsx', 'page.tsx',
  'components/', 'app/', 'public/'
];
setupPhrases.forEach(phrase => {
  const regex = new RegExp(phrase, 'gi');
  const matches = text.match(regex);
  if (matches) console.log(`  "${phrase}": ${matches.length}`);
});

// Look for repeated error patterns
console.log('\n=== Repeated error patterns ===');
const errorPhrases = [
  'Build error', 'Type error', 'Module not found', 'Cannot find',
  'not found', 'does not exist', 'failed', 'error',
  'border-3', 'HiChartLine', 'Google Fonts', 'font'
];
errorPhrases.forEach(phrase => {
  const regex = new RegExp(phrase, 'gi');
  const matches = text.match(regex);
  if (matches) console.log(`  "${phrase}": ${matches.length}`);
});

// Look for repeated user feedback patterns
console.log('\n=== User feedback patterns ===');
const feedbackPhrases = [
  'not use black', 'standard color', 'light theme', 'professional',
  'eye catching', 'visually striking', 'more section', 'add more',
  'make it', 'looks good', 'not look good', 'hero area',
  'consistent', 'reusable', 'breadcrumb', 'PageHero'
];
feedbackPhrases.forEach(phrase => {
  const regex = new RegExp(phrase, 'gi');
  const matches = text.match(regex);
  if (matches) console.log(`  "${phrase}": ${matches.length}`);
});

// Look for repeated component patterns
console.log('\n=== Repeated component patterns ===');
const componentPhrases = [
  'Hero', 'Navbar', 'Footer', 'Features', 'Stats', 'Process',
  'Clients', 'Testimonials', 'BlogPreview', 'CTA', 'ContactForm',
  'PageHero', 'Team', 'Skills', 'Portfolio'
];
componentPhrases.forEach(phrase => {
  const regex = new RegExp('\\b' + phrase + '\\b', 'gi');
  const matches = text.match(regex);
  if (matches) console.log(`  "${phrase}": ${matches.length}`);
});
