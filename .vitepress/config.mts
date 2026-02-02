import { defineConfig } from "vitepress";
import { getThemeConfig } from "@sugarat/theme/node";

const blogTheme = getThemeConfig({
  // custom config
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: blogTheme,
  title: "Luke's Blog",
  description: "Hi, I'm Luke!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
