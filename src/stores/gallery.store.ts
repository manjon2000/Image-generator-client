import type { IGallery } from "@/common/interfaces/gallery.interface";
import { defineStore } from "pinia";

export const useApiGalleryStore = defineStore('gallery_api', {
    state: () => ({
        isLoading: false as boolean,
        data: null as IGallery[] | null,
        itemsPerPages: 6
    }),
    actions: {
        async getGallery() {
            this.isLoading = true
            const gallery = await fetch('https://image-generator.localhorse.net/api/background-images', {
                method: 'GET',
                headers: {
                    'X-API-KEY': '6Jpo1mL6dk4Umr88N5KM3ilNjFLiSNBGLOAG2ZqOMLom86e3rYqAFtYMHhDSyz2X',
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const galleryResult = await gallery.json()
            this.data = galleryResult
            this.isLoading = false;
        }
    }
})