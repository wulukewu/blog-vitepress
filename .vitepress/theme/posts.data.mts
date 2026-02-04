import { createContentLoader } from "vitepress";

interface Post {
  title: string;
  url: string;
  category: string | null;
}

export declare const data: Post[];

export default createContentLoader("docs/**/*.md", {
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => !url.endsWith("index.html") && !url.endsWith("/")) // Exclude index pages
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || "Untitled",
        url,
        category: url.split("/")[2] || null, // Extract category from path: /docs/category/...
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  },
});
