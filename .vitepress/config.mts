import { defineConfig } from "vitepress";
import { getThemeConfig } from "@sugarat/theme/node";
import mathjax3 from "markdown-it-mathjax3";

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
  timeline: true,
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
  RSS: {
    title: "Luke's Blog",
    baseUrl: "https://blog.001015.xyz",
    copyright: "Copyright © 2024-present Luke",
  },
  comment: false,
  // comment: { ... } - Using custom component for better styling control
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  extends: blogTheme,
  title: "Luke's Blog",
  description: "Hi, I'm Luke!",
  cleanUrls: true,
  sitemap: {
    hostname: "https://blog.001015.xyz",
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return [
            "math",
            "maction",
            "maligngroup",
            "malignmark",
            "menclose",
            "merror",
            "mfenced",
            "mfrac",
            "mglyph",
            "mi",
            "mlabeledtr",
            "mlongdiv",
            "mmultiscripts",
            "mn",
            "mo",
            "mover",
            "mpadded",
            "mphantom",
            "mroot",
            "mrow",
            "ms",
            "mscarries",
            "mscarry",
            "msgroup",
            "msline",
            "mspace",
            "msqrt",
            "msrow",
            "mstack",
            "mstyle",
            "msub",
            "msup",
            "msubsup",
            "mtable",
            "mtd",
            "mtext",
            "mtr",
            "munder",
            "munderover",
            "semantics",
            "annotation",
            "annotation-xml",
            "tt",
          ].includes(tag);
        },
      },
    },
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.jpg" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:wght@400;700&display=swap",
        rel: "stylesheet",
      },
    ],
    // SEO & Social
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    ["meta", { property: "og:title", content: "Luke's Blog" }],
    ["meta", { property: "og:site_name", content: "Luke's Blog" }],
    [
      "meta",
      { property: "og:image", content: "https://blog.001015.xyz/logo.jpg" },
    ],
    ["meta", { property: "og:url", content: "https://blog.001015.xyz/" }],
  ],
  themeConfig: {
    logo: "/logo.jpg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Timeline", link: "/timeline" },
      {
        text: "Articles",
        items: [
          {
            text: "Algorithm",
            link: "/docs/algorithm/",
          },
          { text: "DevOps", link: "/docs/devops/" },
          { text: "Science", link: "/docs/science/" },
          { text: "Frontend", link: "/docs/frontend/" },
        ],
      },
      { text: "About", link: "/about/" },
    ],

    // sidebar: { ... } // Removed to use auto-sidebar from @sugarat/theme

    socialLinks: [{ icon: "github", link: "https://github.com/wulukewu" }],
    search: {
      provider: "local",
    },
  },
  vite: {
    server: {
      watch: {
        ignored: ["**/.vitepress/.temp/**", "**/*.timestamp-*.mjs"],
      },
    },
  },
});
