<script setup>
import JsonExcel from "vue-json-excel3";

const props = defineProps(['companies', 'userId'])
const emit = defineEmits(['updateCompanies'])
const toast = useToast()
let filterName = ref(null)
let companiesFiltered = computed(() => {
    return props.companies
})
function createdNewCompany() {
    console.log('update')
    emit('updateCompanies')
}

const modal = ref(null)
const modalFullInfo = ref(null)
const openDelete = ref(false)
const deletingProgram = ref(null)

function openModal() {
    console.log(modal.value)
    modal.value.open()
}

function openFullModal(company) {
    console.log(company)
    modalFullInfo.value.open(company)
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

async function deleteProgram(company) {
    openDelete.value = true
    deletingProgram.value = company
}

async function deleteRes(companyId) {
    const { error } = await $fetch("/api/company/delete", {
        method: "POST",
        body: {
            ids: [companyId],

        },
    });
    if (error && error.value?.data?.message) {
        toast.add({ title: `Ошибка ${error.value.data.message}` })
    } else {
        emit("updateCompanies");
        openDelete.value = false;
        toast.add({ title: `Предприятие ${deletingProgram.value.name} успешно удалено` })
    }
}

const json_fields = {
    'Название предприятия': 'name',
    'Данные предприятия': 'data',
    'Описание': 'description',
    'Доступные госпрограммы': 'programs',
    'Недоступные госпрораммы': 'programsNotAvailable'
}
const json_data = computed(() => {
    let result = []
    for (let i = 0; i < companiesFiltered.value.length; i++) {
        let jsonCompany = {}
        jsonCompany.name = companiesFiltered.value[i].name
        jsonCompany.data = companiesFiltered.value[i].data.map(item => `${item.label}: ${item.value}`);
        jsonCompany.description = companiesFiltered.value[i].description
        console.log(companiesFiltered.value[i].fullComplianceCompanies)
        jsonCompany.programs = companiesFiltered.value[i].fullCompliancePrograms.map(obj => obj.name).join(',');
        jsonCompany.programsNotAvailable = companiesFiltered.value[i].partialCompliancePrograms.map(obj => obj.name).join(',');
        result.push(jsonCompany)
    }
    return result
})


</script>

<template>
    <div class="flex justify-between">
        <UInput v-model:model-value="filterName" color="blue" variant="outline" placeholder="Поиск по названию..." />
        <UButton color="sky" variant="outline" icon="i-heroicons-pencil-square" label="Добавить новое предприятие"
            @click="openModal" />
        <UButton color="sky" variant="outline" icon="i-heroicons-briefcase"
            label="Создать отчет о анализе информации о предприятиях" @click="">
            <JsonExcel class="btn btn-default" :data="json_data" :fields="json_fields" worksheet="My Worksheet"
                name="filename.xls">
                Создать отчет о анализе информации о предприятиях
            </JsonExcel>
        </UButton>
    </div>
    <div class="">
        <UCard v-for="company in companiesFiltered" class="my-2">
            <template #header>
                <div class="flex justify-between items-center">
                    <UButton color="black" variant="link" @click="openFullModal(company)"><span class="font-bold">{{
                        company.name
                            }}</span></UButton>
                    <div class="flex">
                        <UBadge v-if="company?.data !== null" color="blue" variant="outline" label="Анализ завершен" />
                        <UBadge v-else color="blue" variant="outline" label="Ожидает анализа" />
                        <UButton class="ml-8" icon="i-heroicons-trash" size="sm" color="red" variant="ghost"
                            :trailing="false" @click="deleteProgram(company)" />
                    </div>
                </div>

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
    <CompanyFormModal @create-new-company="createdNewCompany" @close-modal="isOpen = false" ref="modal"
        :userId="props.userId" />
    <CompanyFullInfo ref="modalFullInfo" :userId="props.userId" @update-company="createdNewCompany" />
    <UModal v-model="openDelete">
        <div class="p-4">
            <span>Вы уверены, что хотите удалить предприятие {{ deletingProgram.name }} ?</span>
            <div class="flex justify-around">
                <UButton color="blue" variant="outline" label="Да" @click="deleteRes(deletingProgram.id)" />
                <UButton color="red" variant="outline" label="Нет" @click="openDelete = false" />
            </div>
        </div>
    </UModal>
</template>