import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const icons = [
  { name: 'tailwindcss.svg', url: 'https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg' },
  { name: 'react.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'javascript.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'java.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'python.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'gsap.svg', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/greensock.svg' },
  { name: 'git.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'github.svg', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' }
];

console.log('Downloading icons to public/icons...');

icons.forEach(icon => {
  const dest = path.join(iconsDir, icon.name);
  const file = fs.createWriteStream(dest);

  https.get(icon.url, response => {
    if (response.statusCode === 302 || response.statusCode === 301) {
      // Follow redirect if any
      https.get(response.headers.location, redirectResponse => {
        redirectResponse.pipe(file);
      });
    } else {
      response.pipe(file);
    }
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${icon.name} successfully.`);
    });
  }).on('error', err => {
    fs.unlink(dest, () => {});
    console.error(`Failed to download ${icon.name}:`, err.message);
  });
});
