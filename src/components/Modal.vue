<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
import ColorPicker from '@/components/form/ColorPicker.vue'

interface IStructDataForm {
  key: string
  value: string
}

const props = defineProps<{
  isOpen: boolean
  title: string
}>()
const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void
}>()

function toggleShowModal() {
  emit('update:isOpen', !props.isOpen)
}

function submitForm(event: HTMLFormElement) {
  let structForm: IStructDataForm[] = []
  const elementsForm = event.srcElement.elements

  for (let i = 0; i < elementsForm.length; i++) {
    let element = <HTMLInputElement>elementsForm[i]
    if (element.getAttribute('type') !== 'submit') {
      structForm.push({ key: element.name, value: element.value })
    }
  }

  console.log(structForm)

  toggleShowModal()
}
</script>

<template>
  <template v-if="$props.isOpen">
    <div class="c-modal">
      <div class="c-modal__overlay" @click="toggleShowModal()"></div>
      <div class="c-modal__content">
        <div class="c-modal__content__header">
          <h3 class="c-modal__content__header-title">{{ $props.title }}</h3>
        </div>
        <form class="c-modal__content-form" @submit.prevent="submitForm">
          <slot></slot>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  </template>
</template>

<style lang="scss">
.c-modal {
  @apply w-full h-[100dvh] fixed top-0;

  &__overlay {
    @apply w-full h-full bg-black fixed top-0 backdrop-blur-sm z-10;
    --tw-bg-opacity: 0.8;
    --tw-backdrop-blur: blur(5px);
  }

  &__content {
    @apply max-w-96 min-h-32 max-h-96 overflow-y-auto bg-white rounded-md absolute top-0 bottom-0 left-0 right-0 m-auto z-20;

    &__header {
      @apply flex justify-between px-4 py-2;

      &-title {
        @apply text-sm;
      }
    }
  }
}
</style>
