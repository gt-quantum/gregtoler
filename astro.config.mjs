// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// V1 site retired 2026-09-14. The old pages live under src/pages/_v1/ (the
// underscore keeps them out of routing). Old URLs redirect via public/_redirects.

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [react()],
});
