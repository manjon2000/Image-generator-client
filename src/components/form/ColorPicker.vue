<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'

defineProps<{
  placeholder: string
}>()

const emit = defineEmits<{
  (event: 'update:color', value: string): void
}>()
const colorPicker = ref('')

const emitColor = () => {
  emit('update:color', colorPicker.value)
}
</script>

<template>
  <div class="c-input-color-picker">
    <template v-if="colorPicker !== ''">
      <p class="c-input-color-picker__value">{{ colorPicker }}</p>
    </template>
    <template v-if="!colorPicker">
      <p class="text-sm text-gray-400">{{ $props.placeholder }}</p>
    </template>
    <input
      class="c-input-color-picker__input"
      type="color"
      name="color-picker"
      v-model="colorPicker"
      @input="emitColor"
    />
  </div>
</template>

<style lang="scss">
.c-input-color-picker {
  @apply w-full h-12 relative flex items-center rounded-lg shadow-md px-4 py-2 border-gray-300 border-[1px];

  &__value {
    @apply font-semibold text-sm text-black;
    --tw-text-opacity: 0.5;
  }

  &__input {
    @apply w-full h-full opacity-0 absolute top-0 left-0 mb-4;
  }
}
</style>
