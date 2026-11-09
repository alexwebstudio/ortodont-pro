import localFont from "next/font/local";

export const pribylskaia = localFont({
  src: "../../public/fonts/Pribylskaia.woff2",
  variable: "--font-pribylskaia",
  display: "swap",
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
  preload: true,
});

export const golos = localFont({
  src: [
    { path: "../../public/fonts/GolosText-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/GolosText-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/GolosText-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-golos",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const jetbrains = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
  adjustFontFallback: false,
  preload: true, // штамп и параметры на первом экране: поздняя подмена шрифта сдвигает LCP
});

export const fontVariables = [pribylskaia.variable, golos.variable, jetbrains.variable].join(" ");
