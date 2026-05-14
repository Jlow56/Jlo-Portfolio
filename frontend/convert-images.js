import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, basename, extname } from 'path';

const inputDir = './src/assets/img/galerie';
const outputDir = './src/assets/img/galerie';

const files = readdirSync(inputDir).filter(f =>
  ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
);

for (const file of files) {
  const input = join(inputDir, file);
  const output = join(outputDir, basename(file, extname(file)) + '.webp');

  await sharp(input)
    .webp({ quality: 90 })
    .toFile(output);

  console.log(`✅ ${file} → ${basename(output)}`);
}

console.log(`\nTerminé — ${files.length} images converties.`);