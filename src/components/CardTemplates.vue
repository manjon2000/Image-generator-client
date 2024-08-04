<script setup lang="ts">
defineProps<{
  title: string
  url: string
}>()
</script>

<template>
  <div class="flex flex-col gap-2 hover:cursor-pointer">
    <img
      :srcset="$props.url"
      v-alt="$props.title"
      class="rounded object-cover aspect-video hover:scale-105 transition-all"
    />
    <h3>{{ $props.title }}</h3>
  </div>
</template>

<style scoped lang="scss"></style>
