import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa"
import WindiCSS from "vite-plugin-windicss"
import { fileURLToPath, URL } from "url"

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: ["favicon.svg"],
  manifest: {
    name: "Sunday",
    short_name: "Sunday",
    theme_color: "#ffffff",
    icons: [
      {
        src: "maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable_icon_x384.png",
        sizes: "384x384",
        type: "image/png",
      },
    ],
  },
  registerType: "autoUpdate",
  workbox: {
    runtimeCaching: [
      // {
      //   urlPattern: /someInterface/i, // 接口缓存 此处填你想缓存的接口正则匹配
      //   handler: "CacheFirst",
      //   options: {
      //     cacheName: "interface-cache",
      //   },
      // },
      {
        urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts静态资源缓存
        handler: "CacheFirst",
        options: {
          cacheName: "js-css-cache",
        },
      },
      {
        urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
        handler: "CacheFirst",
        options: {
          cacheName: "image-cache",
        },
      },
    ],
    navigateFallback: "index.html",
  },
  devOptions: {
    enabled: true,
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions), WindiCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://api.nbtca.space/dev/",
        // target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: path => {
          return path.replace(/^\/api/, "")
        },
      },
    },
  },
})
