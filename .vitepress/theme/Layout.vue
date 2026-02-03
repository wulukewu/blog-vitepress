<script setup lang="ts">
import { useData, useRouter } from "vitepress";
import BlogTheme from "@sugarat/theme";
import { onMounted, ref } from "vue";
import GiscusComment from "./components/GiscusComment.vue";

const { Layout } = BlogTheme;
const { frontmatter } = useData();
const router = useRouter();

const targetScrollPos = ref<number | null>(null);
const scrollAttempts = ref(0);
const maxAttempts = 20; // Try for about 2 seconds

const scrollToPostList = () => {
  const el = document.querySelector(".blog-list-wrapper");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    targetScrollPos.value = top;
    scrollAttempts.value = 0;
    attemptScroll();
  }
};

const attemptScroll = () => {
  if (scrollAttempts.value >= maxAttempts || targetScrollPos.value === null) {
    targetScrollPos.value = null;
    return;
  }

  scrollAttempts.value++;
  window.scrollTo({ top: targetScrollPos.value, behavior: "smooth" });

  // Keep trying until we're actually at the right position or max attempts reached
  requestAnimationFrame(() => {
    if (
      targetScrollPos.value !== null &&
      Math.abs(window.scrollY - targetScrollPos.value) > 50
    ) {
      setTimeout(attemptScroll, 100);
    } else {
      targetScrollPos.value = null; // Success, stop trying
    }
  });
};

// Check tag on route change
router.onAfterRouteChanged = (to) => {
  const url = new URL(window.location.href);
  if (url.searchParams.get("tag")) {
    setTimeout(scrollToPostList, 100);
  }
};

// Scroll on mount if tag is present
onMounted(() => {
  const url = new URL(window.location.href);
  if (url.searchParams.get("tag")) {
    setTimeout(scrollToPostList, 500);
  }
});
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
