<script setup lang="ts">
    import { useAuthStore } from '../../store/auth';
    import { useCompaniesStore } from '../../store/companies';

    definePageMeta({
        middleware: [
            'auth'
        ],
        validate: async (route) => {
            // Check if the id is made up of digits
            return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
        }
    })
    
    console.log('setup')
    const route = useRoute()
    const id = Number(route.params.id);
    const { getCompanies } = useCompaniesStore();

    const companies = await getCompanies(id)
    const countCompanies = companies?.length
    const countProgs = 4

    const { data: user } = await useFetch(`/api/user/${id}`)
    console.log()

    const items = [
        {
            key: 'companies',
            label: 'Предприятия',
        }, 
        {
            key: 'programs',
            label: 'Доступные для участия госпрограммы',
        },
        {
            key: 'programsAll',
            label: 'Все госпрограммы',
        }
    ]
</script>

<template>
    <UContainer class="mt-32">
        <div class="grid">
            <div class="row-start-1 col-span-1 max-w-56">
                <div class="block">
                    <UIcon name="i-mdi-account-circle-outline" class="w-6 h-6" dynamic />
                    {{ user.surname }} {{ user.name }} {{ user.patronymic }}
                </div>

                <div class="block mt-5">
                    <span>Информация</span>
                    <div v-if="companies">
                        <UIcon name="i-material-symbols-location-away" class="w-6 h-6" dynamic />
                        <span>Кол-во предприятий</span>
                        {{ countCompanies }}
                    </div>
                    <div v-if="countProgs > 0">
                        <UIcon name="i-material-symbols-finance-mode" class="w-6 h-6" dynamic />
                        <span>Кол-во доступных госпрограмм</span>
                        {{ countProgs }}
                    </div>
                </div>
            </div>
            <UTabs :items="items" class="w-full row-start-1 col-span-4">
                <template #item="{ item, selected }">
                    <div v-if="item.key == 'companies'">
                        <div class="">
                            <UCard v-for="company in companies" class="my-2">
                                <template #header>
                                    {{ company.name }}
                                </template>
                            </UCard>
                        </div>
                    </div>
                </template>
        </UTabs>
        </div>
        
    </UContainer>
</template>