<script setup lang="ts">
import { computed } from "vue";
import { data as posts } from "../posts.data.mts";

const props = defineProps<{
  path: string;
}>();

const filteredPosts = computed(() => {
  return posts.filter((post) => post.category === props.path);
});
</script>

<template>
  <div class="article-list">
    <div v-if="filteredPosts.length === 0" class="empty">No posts found.</div>
    <ul v-else>
      <li v-for="post in filteredPosts" :key="post.url">
        <a :href="post.url">{{ post.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.article-list ul {
  list-style: none;
  padding: 0;
}

.article-list li {
  margin: 0.5rem 0;
}

.article-list a {
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.article-list a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.empty {
  font-style: italic;
  color: var(--vp-c-text-2);
}
</style>
