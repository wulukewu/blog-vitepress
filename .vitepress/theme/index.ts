import BlogTheme from "@sugarat/theme";
import "./style.css";
import Layout from "./Layout.vue";

import Timeline from "./components/Timeline.vue";
import Typewriter from "./components/Typewriter.vue";
import ArticleList from "./components/ArticleList.vue";

export default {
  ...BlogTheme,
  Layout,
  enhanceApp(ctx) {
    BlogTheme.enhanceApp(ctx);
    ctx.app.component("Timeline", Timeline);
    ctx.app.component("Typewriter", Typewriter);
    ctx.app.component("ArticleList", ArticleList);
  },
};
