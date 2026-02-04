<script setup lang="ts">
import { useData, useRouter } from "vitepress";
import BlogTheme from "@sugarat/theme";
import { onMounted, ref, watch } from "vue";
import GiscusComment from "./components/GiscusComment.vue";

const { Layout } = BlogTheme;
const { frontmatter } = useData();
const router = useRouter();

// Sidebar Toggle Logic
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("blog-sidebar-open", String(isSidebarOpen.value));
};

// Initialize sidebar state
onMounted(() => {
  const saved = localStorage.getItem("blog-sidebar-open");
  if (saved !== null) {
    isSidebarOpen.value = saved === "true";
  } else {
    // Default to open
    isSidebarOpen.value = true;
  }
});

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
  <Layout :class="{ 'sidebar-collapsed': !isSidebarOpen }">
    <template #doc-before>
      <h1 v-if="frontmatter.title" class="page-title">
        {{ frontmatter.title }}
      </h1>
    </template>

    <template #doc-after>
      <GiscusComment />
    </template>
  </Layout>

  <Teleport to="body">
    <button
      class="sidebar-toggle-btn"
      :class="{ collapsed: !isSidebarOpen }"
      @click="toggleSidebar"
      :title="isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'"
    >
      <svg
        v-if="isSidebarOpen"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
        />
      </svg>
    </button>
  </Teleport>
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

<style>
/* Global styles to handle sidebar collapsing */
@media (min-width: 960px) {
  /* Hide the sidebar */
  .sidebar-collapsed .VPSidebar {
    transform: translateX(-100%);
    width: 0 !important;
    padding: 0 !important;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  /* Expand the content */
  .sidebar-collapsed .VPContent {
    padding-left: 0 !important;
    transition: padding-left 0.3s ease-in-out;
  }

  .sidebar-toggle-btn {
    position: fixed;
    top: 50%;
    /* Use CSS variable if available, otherwise fallback. Standard VitePress sidebar is 272px usually, or var(--vp-sidebar-width) */
    left: var(--vp-sidebar-width);
    transform: translateY(-50%);
    z-index: 50; /* Ensure it's above content but maybe below some overlays */
    width: 24px;
    height: 50px;
    border-radius: 0 50px 50px 0;
    border: 1px solid var(--vp-c-divider);
    border-left: none;
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      left 0.3s ease-in-out,
      background-color 0.3s,
      color 0.3s;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    padding-right: 2px; /* Visual adjustment for icon centering */
  }

  .sidebar-toggle-btn:hover {
    background-color: var(--vp-c-bg-mute);
    color: var(--vp-c-brand);
  }

  .sidebar-toggle-btn.collapsed {
    left: 0;
    border-radius: 0 50px 50px 0; /* Keep shape */
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
}

/* Hide on mobile/tablet where sidebar behavior is different (drawer) */
@media (max-width: 959px) {
  .sidebar-toggle-btn {
    display: none;
  }
}
</style>
