import { VitePWA } from "vite-plugin-pwa";

export default {
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Cockroach Smasher",
        short_name: "CockroachSmasher",
        description: "Enjoy smashing disgusting things",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-chrome-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "android-chrome-192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
        ],
      },
    }),
  ],
};
