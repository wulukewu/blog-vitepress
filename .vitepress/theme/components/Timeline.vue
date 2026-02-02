<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";

const { theme } = useData();

const posts = computed(() => {
  const pagesData = theme.value.blog?.pagesData || [];
  return pagesData
    .filter((p) => p.meta.date && !p.meta.hidden)
    .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date));
});

const postsByYear = computed(() => {
  const years = {};
  posts.value.forEach((p) => {
    const date = new Date(p.meta.date);
    const year = date.getFullYear();
    if (!years[year]) {
      years[year] = [];
    }
    years[year].push(p);
  });
  return Object.keys(years)
    .sort((a, b) => b - a)
    .map((year) => ({
      year,
      posts: years[year],
    }));
});

function formatDate(dateStr) {
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
  padding: 20px 0;
}
.year-title {
  font-size: 1.5em;
  font-weight: bold;
  margin: 1.5em 0 1em;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 0.5em;
}
.post-item {
  display: flex;
  align-items: baseline;
  padding: 8px 0;
  border-bottom: 1px dashed var(--vp-c-divider-light);
}
.post-date {
  width: 60px;
  color: var(--vp-c-text-2);
  font-family: monospace;
  font-size: 0.9em;
  flex-shrink: 0;
}
.post-title {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.2s;
}
.post-title:hover {
  color: var(--vp-c-brand-dark);
}
</style>
