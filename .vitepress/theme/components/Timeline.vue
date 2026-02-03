<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";

const { theme } = useData();

interface Post {
  meta: {
    date: string;
    hidden?: boolean;
    title: string;
  };
  route: string;
}

const posts = computed<Post[]>(() => {
  const pagesData = (theme.value.blog?.pagesData || []) as Post[];
  return pagesData
    .filter((p) => p.meta.date && !p.meta.hidden)
    .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date));
});

const postsByYear = computed(() => {
  const years: Record<number, Post[]> = {};
  posts.value.forEach((p) => {
    const date = new Date(p.meta.date);
    const year = date.getFullYear();
    if (!years[year]) {
      years[year] = [];
    }
    years[year].push(p);
  });
  return Object.keys(years)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => ({
      year,
      posts: years[Number(year)],
    }));
});

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}-${date.getDate()}`;
}
</script>

<template>
  <div class="timeline-container">
    <div v-for="group in postsByYear" :key="group.year" class="year-group">
      <h2 class="year-title">{{ group.year }}</h2>
      <div v-for="post in group.posts" :key="post.route" class="post-item">
        <span class="post-date">{{ formatDate(post.meta.date) }}</span>
        <a :href="withBase(post.route)" class="post-title">{{
          post.meta.title
        }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 0;
}
.year-title {
  font-size: 1.8em;
  font-weight: 700;
  margin: 2em 0 1em;
  font-family: var(--vp-font-family-heading);
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5em;
  position: relative;
}
.year-title::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--vp-c-brand-1);
  border-radius: 2px;
}
.post-item {
  display: flex;
  align-items: baseline;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  transition:
    background-color 0.2s,
    transform 0.2s;
  border-radius: 8px;
  margin-bottom: 4px;
}
.post-item:hover {
  background-color: rgba(255, 255, 255, 0.03);
  transform: translateX(4px);
}
.post-date {
  width: 80px;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  flex-shrink: 0;
}
.post-title {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-family: var(--vp-font-family-base);
  font-weight: 500;
  transition: color 0.2s;
}
.post-title:hover {
  color: var(--vp-c-brand-1);
}
</style>
