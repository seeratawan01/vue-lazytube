import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import babel from '@rollup/plugin-babel';
import path from 'path'

const config = defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  build: {
    minify: true,
    sourcemap: true,
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      fileName: 'vue-lazytube',
      name: 'VueLazytube'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-demi'],
      output: [
        {
          format: "es",
          esModule: true,
          exports: "named",
          globals: {
            vue: 'Vue',
            'vue-demi': 'VueDemi',
          }
        },
        {
          format: 'umd',
          inlineDynamicImports: true,
          interop: "esModule",
          exports: "named",
          globals: {
            vue: 'Vue',
            'vue-demi': 'VueDemi'
          }
        }
      ]
    }
  },

  plugins: [
    vue(),
    babel()
  ],
});

export default config;
