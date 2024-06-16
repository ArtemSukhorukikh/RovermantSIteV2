<script setup>
const props = defineProps(['companies', 'userId'])
const emit = defineEmits(['updateCompanies'])
let filterName = ref(null)
let companiesFiltered = props.companies

function createdNewCompany() {
    emit('updateCompanies')
}

const modal = ref(null)

function openModal() {
    console.log(modal.value)
    modal.value.open()
}

function countFullCompliancePrograms(company) {
    return company.fullCompliancePrograms.length
}

function countPartialCompliancePrograms(company) {
    return company.partialCompliancePrograms.length
}

watch(filterName, (newValue) => {
    companiesFiltered = props.companies.filter((company) => company.name.includes(newValue))
})


</script>

<template>
    <div class="flex justify-between">
        <UInput v-model:model-value="filterName" color="blue" variant="outline" placeholder="Поиск по названию..." />
        <UButton color="sky" variant="outline" icon="i-heroicons-pencil-square" label="Добавить новое предприятие"
            @click="openModal" />
    </div>
    <div class="">
        <UCard v-for="company in companiesFiltered" class="my-2">
            <template #header>
                <UButton color="black" variant="link"><span class="font-bold">{{ company.name }}</span></UButton>
            </template>
            <div class="flex flex-col">
                <span class="font-thin">Доступных для участия госпрограмм:</span>
                <span>{{ countFullCompliancePrograms(company) }}</span>
            </div>
            <div class="flex flex-col">
                <span class="font-thin">Частично доступных для участия госпрограмм:</span>
                <span>{{ countPartialCompliancePrograms(company) }}</span>
            </div>
            <div>

            </div>
        </UCard>
    </div>
    <CompanyFormModal @create-new-company="createdNewCompany" @close-modal="isOpen = false" ref="modal" />
</template>