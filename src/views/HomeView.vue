<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import CardTemplates from '@/components/CardTemplates.vue'
import { useApiTemplatesStore } from '@/stores/templates.store'

const templatesStore = useApiTemplatesStore()
const { loading, data, error } = storeToRefs(templatesStore)

onMounted(() => {
  templatesStore.getTemplates()
})

function getTemplateRoute(id: string): string {
  return `/template/${id}`
}
</script>

<template>
  <template v-if="loading">
    <div class="animate-spin">LOADING...</div>
  </template>
  <div class="max-w-[900px] mx-auto mt-5">
    <template v-if="data !== null">
      <div class="grid grid-cols-3 items-center gap-4">
        <router-link
          v-for="template in data"
          :key="template.id"
          :to="getTemplateRoute(template.id)"
        >
          <CardTemplates :title="template.description" :url="template.previews[0]" />
        </router-link>
      </div>
    </template>
  </div>
</template>
