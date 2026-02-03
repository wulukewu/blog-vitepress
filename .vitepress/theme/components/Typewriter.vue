<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  strings: string[];
  loop?: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
}>();

const currentText = ref("");
const currentStringIndex = ref(0);
const isDeleting = ref(false);
const cursorVisible = ref(true);
let timeout: NodeJS.Timeout;
let cursorInterval: NodeJS.Timeout;

const type = () => {
  const currentString = props.strings[currentStringIndex.value];
  const fullString = currentString;

  if (isDeleting.value) {
    currentText.value = fullString.substring(0, currentText.value.length - 1);
  } else {
    currentText.value = fullString.substring(0, currentText.value.length + 1);
  }

  let speed = props.typeSpeed || 100;

  if (isDeleting.value) {
    speed = props.deleteSpeed || 50;
  }

  if (!isDeleting.value && currentText.value === fullString) {
    speed = props.delay || 2000;
    isDeleting.value = true;
  } else if (isDeleting.value && currentText.value === "") {
    isDeleting.value = false;
    currentStringIndex.value =
      (currentStringIndex.value + 1) % props.strings.length;
    speed = 500;
  }

  timeout = setTimeout(type, speed);
};

onMounted(() => {
  type();
  cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value;
  }, 500);
});

onUnmounted(() => {
  clearTimeout(timeout);
  clearInterval(cursorInterval);
});
</script>

<template>
  <span class="typewriter">
    {{ currentText
    }}<span class="cursor" :class="{ hidden: !cursorVisible }">|</span>
  </span>
</template>

<style scoped>
.typewriter {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  color: var(--vp-c-text-1);
}

.cursor.hidden {
  opacity: 0;
}
</style>
