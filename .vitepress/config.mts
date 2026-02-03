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
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  extends: blogTheme,
  title: "Luke's Blog",
  description: "Hi, I'm Luke!",
  cleanUrls: true,
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
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;700&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.jpg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Timeline", link: "/timeline" },
      {
        text: "Algorithm",
        link: "/docs/algorithm/codeforces-algo-master/week-01",
      },
      { text: "DevOps", link: "/docs/devops/docker-ubuntu-ssh-setup" },
      { text: "Science", link: "/docs/science/quantum-system" },
      { text: "Frontend", link: "/docs/frontend/vue-basic-syntax" },
    ],

    sidebar: {
      "/docs/algorithm/": [
        {
          text: "Algorithm",
          items: [
            {
              text: "Week 01",
              link: "/docs/algorithm/codeforces-algo-master/week-01",
            },
            {
              text: "Week 02",
              link: "/docs/algorithm/codeforces-algo-master/week-02",
            },
            {
              text: "Week 03",
              link: "/docs/algorithm/codeforces-algo-master/week-03",
            },
            {
              text: "Week 04",
              link: "/docs/algorithm/codeforces-algo-master/week-04",
            },
            {
              text: "Week 05",
              link: "/docs/algorithm/codeforces-algo-master/week-05",
            },
            {
              text: "Week 05 (LZR)",
              link: "/docs/algorithm/codeforces-algo-master/week-05-lzr",
            },
            {
              text: "Week 06",
              link: "/docs/algorithm/codeforces-algo-master/week-06",
            },
            {
              text: "Week 06 (LZR)",
              link: "/docs/algorithm/codeforces-algo-master/week-06-lzr",
            },
            {
              text: "Week 07",
              link: "/docs/algorithm/codeforces-algo-master/week-07",
            },
            {
              text: "Week 07 (LZR)",
              link: "/docs/algorithm/codeforces-algo-master/week-07-lzr",
            },
            {
              text: "Week 08 (LZR)",
              link: "/docs/algorithm/codeforces-algo-master/week-08-lzr",
            },
            {
              text: "Week 09 (LZR)",
              link: "/docs/algorithm/codeforces-algo-master/week-09-lzr",
            },
            {
              text: "Week 10 (LZR)",
              link: "/docs/algorithm/codeforces-algo-master/week-10-lzr",
            },
            {
              text: "Week 11 (LZR)",
              link: "/docs/algorithm/codeforces-algo-master/week-11-lzr",
            },
            { text: "TOPC 2025 (LZR)", link: "/docs/algorithm/topc-2025-lzr" },
          ],
        },
      ],
      "/docs/devops/": [
        {
          text: "DevOps",
          items: [
            {
              text: "Docker Ubuntu SSH",
              link: "/docs/devops/docker-ubuntu-ssh-setup",
            },
            { text: "GitHub SSH Key", link: "/docs/devops/github-ssh-key" },
            { text: "Bits Std on Mac", link: "/docs/devops/bits-std-on-mac" },
          ],
        },
      ],
      "/docs/science/": [
        {
          text: "Science",
          items: [
            { text: "Quantum System", link: "/docs/science/quantum-system" },
          ],
        },
      ],
      "/docs/frontend/": [
        {
          text: "Frontend",
          items: [
            {
              text: "Vue Basic Syntax",
              link: "/docs/frontend/vue-basic-syntax",
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/wulukewu" }],
    search: {
      provider: "local",
    },
  },
});
