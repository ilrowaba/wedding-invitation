import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages는 저장소 하위 경로를, Vercel은 루트 경로를 사용합니다.
  base: process.env.VERCEL ? '/' : '/wedding-invitation/'
});
