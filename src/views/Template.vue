<script setup lang="ts">
import type { ITemplateResult } from '@/common/interfaces/templates.interface'
import { useApiTemplatesStore } from '@/stores/templates.store'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import ColorPicker from '@/components/form/ColorPicker.vue'
import Modal from '@/components/Modal.vue'

const templatesStore = useApiTemplatesStore()
const route = useRoute()
const result: Ref<ITemplateResult | undefined> = ref(undefined)
const selectedColor = ref<string>('')
onMounted(() => {
  result.value = templatesStore.findTemplate(route.params.id as string)
})

function handleColorUpdate(color: string) {
  selectedColor.value = color
}

function formatString(value: string): string {
  return value.split('_').join(' ')
}
</script>

<template>
  <div class="w-full grid grid-cols-2 max-w-[800px] h-[100dvh] ml-auto">
    <div class="bg-white"></div>
    <div class="bg-black pt-5">
      <h1 class="text-white text-lg font-semibold px-4 pb-5">Edit Template</h1>
      <hr />
      <div class="flex flex-col gap-4 px-4 py-5">
        <h3 class="text-white text-lg font-semibold">Capas</h3>
        <div class="flex flex-col">
          <template v-if="result">
            <div
              v-for="(layer, index) of result.layers"
              :key="layer.id"
              :class="{
                'rounded-t-lg': index === 0,
                'rounded-sm border-none': result.layers.length === 1,
                'rounded-b-lg': index === result.layers.length - 1
              }"
              class="bg-white p-4 border-[1px] border-gray-100 hover:cursor-pointer hover:bg-gray-100 transition-all"
            >
              <p class="text-black first-letter:uppercase">{{ formatString(layer.type) }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

  <Modal :isOpen="true" :title="'Editar Capa'" />
</template>
