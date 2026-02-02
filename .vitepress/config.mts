import { defineConfig } from "vitepress";
import { getThemeConfig } from "@sugarat/theme/node";

const blogTheme = getThemeConfig({
  // custom config
  home: {
    analysis: {
      articles: {
        title: ["Posts", "This Month", "This Week"],
      },
    },
  },
  article: {
    analyzeTitles: {
      topWordCount: "Words: {{value}}",
      topReadTime: "Time: {{value}} min",
      inlineWordCount: "{{value}} words",
      inlineReadTime: "{{value}} min",
      wordCount: "Words",
      readTime: "Reading Time",
      author: "Author",
      publishDate: "Published",
      lastUpdated: "Last Updated",
      tag: "Tags",
    },
  },
  homeTags: {
    title: "Tags",
  },
  recommend: {
    title: "Recommended",
    nextText: "Next",
    empty: "No related posts",
  },
  friend: {
    title: "Friends",
    list: [],
  },
  hotArticle: {
    title: "Hot Posts",
    nextText: "Next",
    empty: "No hot posts",
  },
  formatShowDate: {
    justNow: "Just now",
    secondsAgo: " seconds ago",
    minutesAgo: " minutes ago",
    hoursAgo: " hours ago",
    daysAgo: " days ago",
    weeksAgo: " weeks ago",
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  extends: blogTheme,
  title: "Luke's Blog",
  description: "Hi, I'm Luke!",
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],
  themeConfig: {
    logo: "/logo.jpg",
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
