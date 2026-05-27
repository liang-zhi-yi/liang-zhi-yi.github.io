import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://liang-zhi-yi.github.io',
  integrations: [mdx()],
  output: 'static'
});
