import { defineConfig } from 'vite';
import path from 'path';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
  base: './', // with base you can specify your base and system generates files according to that
  build: {
    sourcemap: true, // it generates js maps for dist
    outDir: '../dist', // output directory
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].min.[ext]' // This allows you to rename your assets
      }
    }
  },
  css: {
    devSourcemap: true, // Enable source maps for CSS
    postcss: { // Enable Postcss for Purgecss
      plugins: [
        process.env.NODE_ENV === 'production'
          ? purgecss({
              content: ['./src/index.html'],
              defaultExtractor: content =>
                content.match(/[\w-/:]+(?<!:)/g) || []
            })
          : undefined
      ].filter(Boolean) // Removes any undefined plugins
    }
  },
  root: path.resolve(__dirname, 'src'), //source directory
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    port: 8080,
    hot: true
  }
});