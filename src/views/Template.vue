<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import type { ITemplateResult } from '@/common/interfaces/templates.interface'
import { useApiTemplatesStore } from '@/stores/templates.store'
import { useRoute } from 'vue-router'
import ColorPicker from '@/components/form/ColorPicker.vue'
import Modal from '@/components/Modal.vue'
import Gallery from '@/components/Gallery.vue'
interface ILayerSelected {
  id: string
  type: string
}

const templatesStore = useApiTemplatesStore()
const route = useRoute()
const result: Ref<ITemplateResult | undefined> = ref(undefined)
const selectedLayer = ref<ILayerSelected | undefined>(undefined)
const isOpenModal = ref<boolean>(false)
onMounted(() => {
  result.value = templatesStore.findTemplate(route.params.id as string)
})

function formatString(value: string): string {
  return value.split('_').join(' ')
}

function onLayerSelected(id: string, type: string) {
  selectedLayer.value = { id, type }
  isOpenModal.value = true
}

function onCloseModalOutput(value: boolean) {
  isOpenModal.value = value
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
              @click="onLayerSelected(layer.id, layer.type)"
              class="bg-white p-4 border-[1px] border-gray-100 hover:cursor-pointer hover:bg-gray-100 transition-all"
            >
              <p class="text-black first-letter:uppercase">{{ formatString(layer.type) }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

  <Gallery />

  <Modal
    :isOpen="!!selectedLayer && isOpenModal"
    :title="'Editar Capa'"
    @update:isOpen="onCloseModalOutput"
  >
    <template v-slot>
      <input type="text" name="color" />
      <input type="text" name="image" />
      <ColorPicker :placeholder="'ssss'" />
    </template>
  </Modal>
</template>
