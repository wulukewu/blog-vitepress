import BlogTheme from "@sugarat/theme";
import "./style.css";
import Layout from "./Layout.vue";

import Timeline from "./components/Timeline.vue";

export default {
  ...BlogTheme,
  Layout,
  enhanceApp(ctx) {
    BlogTheme.enhanceApp(ctx);
    ctx.app.component("Timeline", Timeline);
  },
};
