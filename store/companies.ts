import { defineStore } from 'pinia';

interface CompanyPayloadInterface {
    name: string;
    description: string;
    data: object | null;
    userId: number | null;

}

export const useCompaniesStore = defineStore('companies', {
    state: () => ({
        userId: null as number | null,
        companies: null as Array<CompanyPayloadInterface> | null
    }),
    actions: {
        async getCompanies(userId: number) {
            console.log('get')
            this.userId = userId

            if(this.userId) {
                this.companies = await $fetch(`/api/company/user/${userId}`, {
                    method: 'GET',
                })
            }

            return this.companies
        },
    }
})