<script setup lang="ts">
    import { useAuthStore } from '../../store/auth';
    import { useCompaniesStore } from '../../store/companies';

    definePageMeta({
        middleware: [
            'auth'
        ]
    })
    console.log('setup')

    const {id} = useAuthStore();
    const { getCompanies } = useCompaniesStore();

    if (id) {
        getCompanies(id)
    }

    const items = [{
        key: 'companies',
        label: 'Account',
        description: 'Make changes to your account here. Click save when you\'re done.'
        }, {
        key: 'programs',
        label: 'Password',
        description: 'Change your password here. After saving, you\'ll be logged out.'
    }]
</script>

<template>
    <UContainer>
        <!-- <UTabs :items="items" class="w-full">
            <template #default="{ item, index, selected }">
                <template #header>
                    <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ item.label }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {{ item.description }}
                    </p>
                </template>

                <div v-if="item.key == 'companies'">
                    Предпрития
                </div>
            </template>
        </UTabs> -->
    </UContainer>
</template>