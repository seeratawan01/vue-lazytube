const path = require('path');
const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      name: 'VueLazytube',
      fileName: (format) => `vue-lazytube.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
});
