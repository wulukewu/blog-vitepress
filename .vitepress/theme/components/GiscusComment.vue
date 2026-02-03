<script setup lang="ts">
import Giscus from "@giscus/vue";
import { useData } from "vitepress";

const { isDark } = useData();
</script>

<template>
  <div class="comments-container">
    <Giscus
      id="comments"
      repo="wulukewu/blog-vitepress"
      repo-id="R_kgDORGyibA"
      category="General"
      category-id="DIC_kwDORGyibM4C11GB"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="isDark ? 'transparent_dark' : 'light'"
      lang="en"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.comments-container {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
