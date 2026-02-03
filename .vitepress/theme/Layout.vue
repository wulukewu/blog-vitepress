<script setup lang="ts">
import { useData } from "vitepress";
import BlogTheme from "@sugarat/theme";

const { Layout } = BlogTheme;
const { frontmatter } = useData();
import GiscusComment from "./components/GiscusComment.vue";
</script>

<template>
  <Layout>
    <template #doc-before>
      <h1 v-if="frontmatter.title" class="page-title">
        {{ frontmatter.title }}
      </h1>
    </template>
    <template #doc-after>
      <GiscusComment />
    </template>
  </Layout>
</template>

<style scoped>
.page-title {
  margin-top: -3.5rem;
  margin-bottom: 0.5rem;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
</style>
