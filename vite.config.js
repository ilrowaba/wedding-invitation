import { defineConfig } from 'vite';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';

const photosDirectory = new URL('./public/assets/photos/', import.meta.url);
const galleryVersions = Object.fromEntries(
  readdirSync(photosDirectory)
    .filter((file) => /^gallery-\d+\.(jpe?g|png|webp|avif)$/i.test(file))
    .map((file) => [file, createHash('sha256').update(readFileSync(new URL(file, photosDirectory))).digest('hex').slice(0, 12)])
);

export default defineConfig({
  define: { __GALLERY_VERSIONS__: JSON.stringify(galleryVersions) },
  // GitHub Pages는 저장소 하위 경로를, Vercel은 루트 경로를 사용합니다.
  base: process.env.VERCEL ? '/' : '/wedding-invitation/'
});
