<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useApiGalleryStore } from '@/stores/gallery.store'
import type { IGallery } from '@/common/interfaces/gallery.interface'
import CardTemplates from './CardTemplates.vue'

const galleryStore = useApiGalleryStore()
const { data, itemsPerPages } = storeToRefs(galleryStore)
const imagesPaginated = ref<IGallery[][]>([])
const currentPage = ref<number>(0)

onMounted(() => {
  galleryStore.getGallery()
  if (data.value !== null) {
    const paginatorItems: IGallery[][] = []
    let pageItems: IGallery[] = []
    let currentItems: number = 0

    for (const item of data.value) {
      pageItems.push(item)
      currentItems++

      if (currentItems === itemsPerPages.value) {
        paginatorItems.push(pageItems)
        pageItems = []
        currentItems = 0
      }
    }

    if (pageItems.length > 0) {
      paginatorItems.push(pageItems)
    }

    imagesPaginated.value = paginatorItems
  }
})

function next() {
  if (currentPage.value < imagesPaginated.value.length) {
    currentPage.value += 1
  }
}

function prev() {
  if (currentPage.value > 0) {
    currentPage.value -= 1
  }
}
</script>
<template>
  <div class="c-gallery">
    <div class="c-gallery__overlay"></div>
    <div class="c-gallery__content">
      <div class="grid grid-cols-3 gap-4">
        <template v-if="imagesPaginated">
          <template v-for="(page, currenIndex) of imagesPaginated">
            <template v-if="currenIndex === currentPage">
              <CardTemplates
                v-for="(image, index) of page"
                :key="index"
                :title="image.description"
                :url="image.url + '?size=small'"
              />
            </template>
          </template>
        </template>
      </div>
      <div class="flex items-center gap-4 py-4">
        <button
          @click="prev"
          :disabled="currentPage === 0"
          class="p-2 bg-black text-white text-sm rounded-sm hover:bg-gray-950 disabled:bg-gray-300"
        >
          Prev Page
        </button>
        <button
          @click="next"
          :disabled="currentPage === imagesPaginated.length - 1"
          class="p-2 bg-black text-white text-sm rounded-sm hover:bg-gray-950 disabled:bg-gray-300"
        >
          Next Page
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.c-gallery {
  @apply w-full h-[100dvh] fixed top-0;

  &__overlay {
    @apply w-full h-full bg-black fixed top-0 backdrop-blur-sm z-10;
    --tw-bg-opacity: 0.8;
    --tw-backdrop-blur: blur(5px);
  }

  &__content {
    @apply min-h-32 max-h-[600px] overflow-y-auto bg-white rounded-md absolute top-0 bottom-0 left-0 right-0 m-auto z-20 p-4;
    max-width: 900px;
  }
}
</style>
