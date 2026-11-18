/**
 * Converte fotos de public/images/originais/<pasta>/* em WebP otimizado
 * dentro de public/images/<pasta>/. Ex.: originais/resultados/sofa-antes.jpg
 * -> images/resultados/sofa-antes.webp (WebP, qualidade 80, largura máxima por pasta).
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse, relative } from 'node:path';
import sharp from 'sharp';

const SRC = 'public/images/originais';
const OUT = 'public/images';
/** Largura máxima por pasta (px). Os cards de serviço são exibidos menores. */
const maxWidth = { servicos: 1000, sobre: 1200, hero: 1600, resultados: 1600 };
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.avif', '.tif', '.tiff']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (exts.has(parse(p).ext.toLowerCase())) out.push(p);
  }
  return out;
}

try {
  await stat(SRC);
} catch {
  console.log(`Crie a pasta ${SRC} e coloque suas fotos nela (ex.: ${SRC}/resultados/).`);
  process.exit(0);
}

const files = await walk(SRC);
if (!files.length) console.log('Nenhuma imagem encontrada em', SRC);
for (const file of files) {
  const rel = relative(SRC, file);
  const { dir, name } = parse(rel);
  const destDir = join(OUT, dir);
  await mkdir(destDir, { recursive: true });
  const dest = join(destDir, `${name}.webp`);
  const width = maxWidth[dir.split(/[\\/]/)[0]] ?? 1600;
  const info = await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  console.log(`✓ ${rel} -> ${dest} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}
