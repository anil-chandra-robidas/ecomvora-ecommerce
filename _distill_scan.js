const fs = require('fs');
const path = require('path');

const dbPath = 'C:\\Users\\user\\.local\\share\\mimocode\\mimocode.db';
const buf = fs.readFileSync(dbPath);
const text = buf.toString('utf8');

// Search for repeated workflow keywords in user messages
const keywords = ['again', 'every time', 'like last time', 'the usual', 'repeat', 'same as before', 'as before', 'like we did', 'we did before'];
keywords.forEach(kw => {
  const regex = new RegExp(kw, 'gi');
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.push({offset: m.index, context: text.substring(Math.max(0, m.index-100), Math.min(text.length, m.index + kw.length + 100))});
  }
  if (matches.length > 0) {
    console.log(`=== Keyword: "${kw}" (${matches.length} matches) ===`);
    matches.forEach((match, i) => {
      if (i < 5) console.log(`  [${match.offset}] ${match.context.replace(/\n/g, ' ').substring(0, 250)}`);
    });
    console.log('');
  }
});

// Search for project directories mentioned
console.log('\n=== Project directories mentioned ===');
const projectDirs = ['ecomvora', 'mimo-corporate', 'rulify', 'flexio', 'maxvora'];
projectDirs.forEach(dir => {
  const regex = new RegExp(dir, 'gi');
  let count = 0;
  while (regex.exec(text) !== null) count++;
  if (count > 0) console.log(`  ${dir}: ${count} mentions`);
});

// Look for repeated tool/command patterns
console.log('\n=== Common tool patterns ===');
const toolPatterns = [
  { name: 'npm run dev', regex: /npm run dev/gi },
  { name: 'npm run build', regex: /npm run build/gi },
  { name: 'npm install', regex: /npm install/gi },
  { name: 'git add', regex: /git add/gi },
  { name: 'git commit', regex: /git commit/gi },
  { name: 'git push', regex: /git push/gi },
  { name: 'create-next-app', regex: /create-next-app/gi },
  { name: 'npx', regex: /npx /gi },
];
toolPatterns.forEach(tp => {
  const matches = text.match(tp.regex);
  if (matches) console.log(`  ${tp.name}: ${matches.length} occurrences`);
});

// Look for repeated file operations
console.log('\n=== Repeated file operations ===');
const filePatterns = [
  { name: 'SKILL.md', regex: /SKILL\.md/gi },
  { name: 'MEMORY.md', regex: /MEMORY\.md/gi },
  { name: 'checkpoint.md', regex: /checkpoint\.md/gi },
  { name: '.mimocode/', regex: /\.mimocode\//gi },
];
filePatterns.forEach(fp => {
  const matches = text.match(fp.regex);
  if (matches) console.log(`  ${fp.name}: ${matches.length} occurrences`);
});

// Search for common design patterns repeated across projects
console.log('\n=== Design patterns ===');
const designPatterns = [
  { name: 'Tailwind CSS', regex: /tailwind/gi },
  { name: 'Next.js', regex: /next\.js|nextjs/gi },
  { name: 'React', regex: /\breact\b/gi },
  { name: 'shadcn', regex: /shadcn/gi },
  { name: 'breadcrumb', regex: /breadcrumb/gi },
  { name: 'PageHero', regex: /PageHero/gi },
  { name: 'light theme', regex: /light theme/gi },
  { name: 'dark theme', regex: /dark theme/gi },
];
designPatterns.forEach(dp => {
  const matches = text.match(dp.regex);
  if (matches) console.log(`  ${dp.name}: ${matches.length} occurrences`);
});
