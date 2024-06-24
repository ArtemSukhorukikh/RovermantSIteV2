<script setup>
const program = ref(null)
const openModal = ref(false)
const mode = ref('all')
const company = ref(null)
const openSideBar = ref(false)
const props = defineProps(['userId'])

function open(stateProgram, modeData) {
    console.log(stateProgram)
    program.value = stateProgram
    openModal.value = true
    mode.value = modeData
}

function getPath(program) {
    console.log(program)
    return program.path ? '/userFiles/' + program.path : program.url
}

function openCompanySideBar(companyData) {
    company.value = companyData
    openSideBar.value = true
}
defineExpose({
    openModal,
    open,
});
</script>

<template>
    <UModal v-model="openModal" prevent-close>
        <UCard :ui="{
            width: 'sm:max-w-xl',
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        <span class="font-medium text-3xl">{{ program.name }}</span>
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="openModal = false" />
                </div>
            </template>
            <div v-if="mode == 'all'">
                <span class="text-2xl">Извлеченный условия участия</span>
                <div class="flex flex-col justify-start">
                    <span v-for="condition in program.conditions">{{ condition.condition }}</span>
                </div>
            </div>
            <div v-if="mode == 'partialCompliancePrograms'">
                <span class="text-2xl">Предприятие соответствует условиям участия:</span>
                <div class="flex flex-col justify-start">
                    <span v-for="condition in program.matchingConditions">{{ condition.condition }}</span>
                </div>
                <span class="text-2xl mt-8">Предприятие не соответствует условия участия:</span>
                <div class="flex flex-col justify-start">
                    <span v-for="condition in program.nonMatchingConditions">{{ condition.condition }}</span>
                </div>
            </div>
            <div v-if="mode == 'allWithCompany'">
                <span class="text-2xl">Извлеченный условия участия</span>
                <div class="flex flex-col justify-start">
                    <span v-for="condition in program.conditions">{{ condition.condition }}</span>
                </div>
                <span class="text-2xl">Предприятия доступные для участия</span>
                <UCard v-for="company in program.fullComplianceCompanies">
                    <template #header>
                        <UButton color="black" variant="link" @click="openCompanySideBar(company)"><span
                                class="font-bold">{{
                                    company.name
                                }}</span></UButton>
                    </template>
                </UCard>
            </div>
            <template #footer>
                <UButton class="mr-12" color="indigo" variant="outline">
                    <a :href="getPath(program)" target="_blank" >Открыть источник</a>
                </UButton>
            </template>
        </UCard>
    </UModal>

    <USlideover v-model="openSideBar" prevent-close>
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ company.name }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="openSideBar = false" />
                </div>
            </template>
            <div>
                <CompanyExtractData :company="company" />
            </div>
        </UCard>
    </USlideover>
</template>