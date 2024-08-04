import { defineStore } from "pinia";
import { type ITemplateResult } from '@/common/interfaces/templates.interface'


export const useApiTemplatesStore = defineStore('templates_api', {
    state: () => ({
        data: null as ITemplateResult[] | null,
        loading: false,
        error: ""
    }),
    actions: {
        async getTemplates() {
            try {
                this.loading = true;
                const templated = await fetch('https://image-generator.localhorse.net/api/templates', {
                    method: 'GET',
                    headers: {
                        'X-API-KEY': '6Jpo1mL6dk4Umr88N5KM3ilNjFLiSNBGLOAG2ZqOMLom86e3rYqAFtYMHhDSyz2X',
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                const templateResult = await templated.json()
                console.log(templateResult)
                this.data = templateResult
                this.loading = false;
            } catch (error) {
                this.loading = false;
                this.error = 'Error Request';
            }
        },
        findTemplate(id: string) {
            return this.data?.find((template) => template.id === id)
        }
    }
})