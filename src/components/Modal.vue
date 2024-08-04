<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'

defineProps<{
  isOpen: boolean
  title: string
}>()
</script>

<template>
  <template v-if="$props.isOpen">
    <div class="c-modal">
      <div class="c-modal__overlay"></div>
      <div class="c-modal__content">
        <div class="c-modal__content__header">
          <h3 class="text-xl">{{ $props.title }}</h3>
        </div>
      </div>
    </div>
  </template>
</template>

<style lang="scss">
.c-modal {
  @apply w-full h-[100dvh] fixed top-0;

  &__overlay {
    @apply w-full h-full bg-black fixed top-0 backdrop-blur-sm;
    --tw-bg-opacity: 0.8;
    --tw-backdrop-blur: blur(5px);
    z-index: 2;
  }

  &__content {
    @apply max-w-96 h-12 bg-white rounded-md absolute top-0 bottom-0 left-0 right-0 m-auto z-10;

    &__header {
      @apply flex justify-between px-4 py-2;
    }
  }
}
</style>
