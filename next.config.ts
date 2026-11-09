import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// Адреса этой машины: IP WSL или локальной сети. Без них dev-режим блокирует скрипты,
// если сайт открыт не через localhost, и контент остаётся скрытым.
const localAddresses = Object.values(networkInterfaces())
  .flat()
  .flatMap((item) => (item && !item.internal && item.family === "IPv4" ? [item.address] : []));

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: localAddresses,
  // Корень задан явно: если выше по дереву есть другой package-lock.json, Next берёт корнем
  // его папку, пути внутри Turbopack начинаются с кириллицы, и он падает с паникой char boundary.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    deviceSizes: [420, 640, 828, 1080, 1440, 1920],
  },
};

export default nextConfig;
