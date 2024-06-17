<script setup>
let modalOpen = ref(false)
let company = ref(null)

function open(companyData) {
    console.log(companyData)
    modalOpen.value = true
    company.value = companyData
}

defineExpose({
    modalOpen,
    open
})
</script>

<template>
    <UModal v-model="modalOpen" :fullscreen="true" :prevent-close="true">
        <UCard :ui="{ width: 'sm:max-w-xl', ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        <span class="font-medium text-3xl">{{ company.name }}</span>
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="modalOpen = false" />
                </div>
            </template>
            <div>
                <span>Извлеченный данные</span>
                <div>

                </div>
            </div>
            <div>
                <span class="text-2xl">Госпрограммы доступные для участия</span>
                <div class="grid grid-rows-4 grid-flow-col gap-4 mt-2">
                    <UCard v-for="program in company.fullCompliancePrograms">
                        <template #header>
                            <UButton color="black" variant="link" @click=""><span class="font-bold">{{
                                program.name
                            }}</span></UButton>
                        </template>
                    </UCard>
                </div>
            </div>
            <div>
                <span class="text-2xl">Госпрограммы доступные для участия</span>
                <div class="grid grid-rows-4 grid-flow-col gap-4 mt-2">
                    <UCard v-for="program in company.fullCompliancePrograms">
                        <template #header>
                            <UButton color="black" variant="link" @click=""><span class="font-bold">{{
                                program.name
                            }}</span></UButton>
                        </template>
                    </UCard>
                </div>
            </div>
            <div>
                <span class="text-2xl">Госпрограммы доступные для участия</span>
                <div class="grid grid-rows-4 grid-flow-col gap-4 mt-2">
                    <UCard v-for="program in company.fullCompliancePrograms">
                        <template #header>
                            <UButton color="black" variant="link" @click=""><span class="font-bold">{{
                                program.name
                                    }}</span></UButton>
                        </template>
                    </UCard>
                </div>
            </div>
        </UCard>
    </UModal>
</template>