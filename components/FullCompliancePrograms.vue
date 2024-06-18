<script setup>
const props = defineProps(['statePrograms', 'userId', 'mode'])

const resource = ['Все', 'Новость', 'Постановление правительства']

let stateProgramsFiltered = ref(null)
let filterName = ref(null)
let filterResource = ref(resource[0])
let modalProgram = ref(null)

const modeModal = computed(() => {
    return mode.value == 'all' ? 'allWithCompany' : 'all'
})

if (props.mode !== 'all') {
    stateProgramsFiltered.value = props.statePrograms?.filter(program => program.fullComplianceCompanies.length > 0)
} else {
    stateProgramsFiltered.value = props.statePrograms
}

function getFullComplianceCompaniesName(stateProgram) {
    let dataForCard = ''
    if (stateProgram && stateProgram.fullComplianceCompanies && stateProgram.fullComplianceCompanies.length > 5) {
        dataForCard = ''
        for (let i = 0; i < 5; i++) {
            if (i < 4) {
                dataForCard += stateProgram.value.fullComplianceCompanies[i].name + ', '
            } else {
                dataForCard += stateProgram.value.fullComplianceCompanies[i].name + ' и другие...'
            }
        }
    } else if (stateProgram && stateProgram.fullComplianceCompanies && stateProgram.fullComplianceCompanies.length > 0) {
        for (let i = 0; i < stateProgram.fullComplianceCompanies.length; i++) {
            if (i == stateProgram.fullComplianceCompanies.length - 1) {
                dataForCard += stateProgram.fullComplianceCompanies[i].name
            } else {
                dataForCard += stateProgram.fullComplianceCompanies[i].name + ' ,'
            }
        }
    }
    return dataForCard
}

function getPartialComplianceCompanies(stateProgram) {
    let dataForCard = ''
    if (stateProgram && stateProgram.partialComplianceCompanies && stateProgram.partialComplianceCompanies.length > 5) {
        dataForCard = ''
        for (let i = 0; i < 5; i++) {
            if (i < 4) {
                dataForCard += stateProgram.value.partialComplianceCompanies[i].name + ', '
            } else {
                dataForCard += stateProgram.value.partialComplianceCompanies[i].name + ' и другие...'
            }
        }
    } else if (stateProgram && stateProgram.partialComplianceCompanies && stateProgram.partialComplianceCompanies.length > 0) {
        for (let i = 0; i < stateProgram.partialComplianceCompanies.length; i++) {
            if (i == stateProgram.partialComplianceCompanies.length - 1) {
                dataForCard += stateProgram.partialComplianceCompanies[i].name
            } else {
                dataForCard += stateProgram.partialComplianceCompanies[i].name + ' ,'
            }
        }
    }
    return dataForCard
}

function getNonComplianceCompanies(stateProgram) {
    let dataForCard = ''
    if (stateProgram && stateProgram.nonComplianceCompanies && stateProgram.nonComplianceCompanies.length > 5) {
        dataForCard = ''
        for (let i = 0; i < 5; i++) {
            if (i < 4) {
                dataForCard += stateProgram.value.nonComplianceCompanies[i].name + ', '
            } else {
                dataForCard += stateProgram.value.nonComplianceCompanies[i].name + ' и другие...'
            }
        }
    } else if (stateProgram && stateProgram.nonComplianceCompanies && stateProgram.nonComplianceCompanies.length > 0) {
        for (let i = 0; i < stateProgram.nonComplianceCompanies.length; i++) {
            if (i == stateProgram.nonComplianceCompanies.length - 1) {
                dataForCard += stateProgram.nonComplianceCompanies[i].name
            } else {
                dataForCard += stateProgram.nonComplianceCompanies[i].name + ' ,'
            }
        }
    }
    return dataForCard
}


watch(filterName, (newValue) => {
    console.log('name')
    if (props.mode !== 'all') {
        stateProgramsFiltered.value = props.statePrograms?.filter(program => program.fullComplianceCompanies.length > 0)
    } else {
        stateProgramsFiltered.value = props.statePrograms
    }

    if (newValue !== '') {
        stateProgramsFiltered.value = stateProgramsFiltered.value?.filter(program => program.name.includes(newValue))
    }

    if (filterResource.value && filterResource.value !== resource[0]) {
        stateProgramsFiltered.value = stateProgramsFiltered.value?.filter(program => program.resource.includes(filterResource))
    }
})

watch(filterResource, (newValue) => {
    console.log('resorse')
    if (props.mode !== 'all') {
        stateProgramsFiltered.value = props.statePrograms?.filter(program => program.fullComplianceCompanies.length > 0)
    } else {
        stateProgramsFiltered.value = props.statePrograms
    }
    if (newValue !== resource[0]) {
        stateProgramsFiltered.value = stateProgramsFiltered.value?.filter(program => program.resource.includes(newValue))
    }

    if (filterName.value) {
        stateProgramsFiltered.value = stateProgramsFiltered.value?.filter(program => program.name.includes(filterName))
    }
})

</script>

<template>
    <div class="">
        <div class="flex justify-between items-end">
            <UInput v-model:model-value="filterName" color="blue" variant="outline"
                placeholder="Поиск по названию..." />
            <div>
                <span class="font-extralight">Тип ресурса:</span>
                <USelect v-model="filterResource" color="blue" variant="outline" placeholder="Поиск по типу ресурса..."
                    trailing :options="resource" />
            </div>

        </div>
        <UCard v-for="stateProgram in stateProgramsFiltered" class="my-2">
            <template #header>
                <div class="flex justify-between">
                    <UButton color="black" variant="link"><span class="font-bold"
                            @click="modalProgram.open(stateProgram, modeModal)">{{ stateProgram.name
                            }}</span>
                    </UButton>
                    <UBadge color="blue" variant="solid">{{ stateProgram.resource }}</UBadge>
                </div>
            </template>
            <div class="flex flex-col">
                <span class="font-thin">Доступные для участия преддприятия:</span>
                <span>{{ getFullComplianceCompaniesName(stateProgram) }}</span>
            </div>
            <div v-if="props.mode == 'all'" class="flex flex-col">
                <span class="font-thin">Условия участия частично выполняются в предприятиях:</span>
                <span>{{ getPartialComplianceCompanies(stateProgram) }}</span>
            </div>
            <div v-if="props.mode == 'all'" class="flex flex-col">
                <span class="font-thin">Не доступные для участия преддприятия:</span>
                <span>{{ getNonComplianceCompanies(stateProgram) }}</span>
            </div>
        </UCard>
    </div>
    <StateProgramInfo ref="modalProgram" :userId="props.userId" />
</template>