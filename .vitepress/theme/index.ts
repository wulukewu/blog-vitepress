import BlogTheme from "@sugarat/theme";
import "./style.css";

import Timeline from "./components/Timeline.vue";

export default {
  ...BlogTheme,
  enhanceApp(ctx) {
    BlogTheme.enhanceApp(ctx);
    ctx.app.component("Timeline", Timeline);
  },
};
