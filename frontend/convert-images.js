import sharp from "sharp";
import { readdirSync, statSync, existsSync, mkdirSync, unlinkSync } from "fs";
import { join, extname, basename, dirname } from "path";

const INPUT_DIRS = [
  "./src/assets/logo",
];

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

async function processFile(filePath) {
  const ext = extname(filePath).toLowerCase();

  if (!IMAGE_EXTENSIONS.includes(ext)) return;

  const outputDir = dirname(filePath);
  ensureDir(outputDir);

  const outputFile =
    join(outputDir, basename(filePath, ext)) + ".webp";

  try {
    await sharp(filePath)
      .resize({
        width: 1400,          // ↓ 1600 → 1400 (gain poids)
        height: 1400,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 65,          // ↓ 75 → 65 (gain énorme poids)
        effort: 6,
        lossless: false,
        nearLossless: false,
      })
      .toFile(outputFile);

    console.log(`✔ ${filePath} → ${outputFile}`);

    /**
     * SUPPRESSION SOURCE
     * (uniquement si conversion réussie)
     */
    if (ext !== ".webp") {
      unlinkSync(filePath);
      console.log(`🗑 supprimé: ${filePath}`);
    }

  } catch (err) {
    console.error(`✖ Erreur: ${filePath}`, err.message);
  }
}

async function walk(dir) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      await walk(fullPath);
    } else {
      await processFile(fullPath);
    }
  }
}

async function run() {
  console.log("🚀 Conversion WebP + nettoyage...\n");

  for (const dir of INPUT_DIRS) {
    if (!existsSync(dir)) {
      console.warn(`⚠️ Dossier introuvable: ${dir}`);
      continue;
    }

    console.log(`📁 Scan: ${dir}`);
    await walk(dir);
  }

  console.log("\n🎉 Terminé");
}

run();