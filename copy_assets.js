const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const brainDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\e9a72bb0-72d0-48ee-aeed-2d16e5b65823';

const files = [
  { src: 'aman_profile_avatar_1792350846950.jpg', dest: 'avatar.jpg' },
  { src: 'insurance_policy_analyzer_preview_1792350873179.jpg', dest: 'project-rag.jpg' },
  { src: 'crowdvibe_music_platform_preview_1792350928899.jpg', dest: 'project-crowdvibe.jpg' },
  { src: 'campus_life_sports_preview_1792350993385.jpg', dest: 'event-sports.jpg' }
];

files.forEach(f => {
  const srcPath = path.join(brainDir, f.src);
  const destPath = path.join(targetDir, f.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} -> ${f.dest}`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
});
console.log('Done copying assets.');
