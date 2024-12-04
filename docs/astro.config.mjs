// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "always",
  integrations: [
    starlight({
      credits: true,
      title: "Fluwtate",
      description:
        "Documentation for Fluwtate state management library for React and Vanilla JS",
      logo: {
        dark: "./src/assets/logo-dark.svg",
        light: "./src/assets/logo-dark.svg",
        alt: "Fluwtate Logo",
      },
      favicon: "./favicon.svg",
      customCss: [
        "./src/styles/custom.css",
        "@fontsource/geist-sans/100.css",
        "@fontsource/geist-sans/200.css",
        "@fontsource/geist-sans/300.css",
        "@fontsource/geist-sans/400.css",
        "@fontsource/geist-sans/500.css",
        "@fontsource/geist-sans/600.css",
        "@fontsource/geist-sans/700.css",
        "@fontsource/geist-sans/800.css",
        "@fontsource/geist-sans/900.css",
      ],
      social: {
        github: "https://github.com/fluwdev/fluwtate",
        linkedin: "https://www.linkedin.com/in/cto-jesus-alcala/",
      },
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
          ],
        },
        {
          label: "APIs",
          autogenerate: { directory: "apis" },
        },
        {
          label: "Hooks",
          autogenerate: { directory: "hooks" },
        },
        {
          label: "Middleware",
          autogenerate: { directory: "middleware" },
        },
      ],
    }),
  ],
});
