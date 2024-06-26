<script setup>
const props = defineProps(['userId'])
const emit = defineEmits(['updateCompany'])
let modalOpen = ref(false);
let company = ref(null);
let modal = ref(null);
let modalProgram = ref(null)

const items = [
    [
        {
            label: "Редактировать",
            icon: "i-heroicons-pencil-square-20-solid",
            click: () => {
                modalOpen.value = false
                modal.value.open(company);
            },
        },
    ],
];

function open(companyData) {
    console.log(companyData);
    modalOpen.value = true;
    company.value = companyData;
}

function opemProgramModal(program, mode) {
    modalProgram.value.open(program, mode)
}

defineExpose({
    modalOpen,
    open,
});
</script>

<template>
    <UModal v-model="modalOpen" :fullscreen="company?.data !== null" prevent-close>
        <UCard v-if="company?.data !== null" :ui="{
            width: 'sm:max-w-xl',
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        <span class="font-medium text-3xl">{{ company.name }}</span>
                    </h3>
                    <div class="flex items-center">
                        <UDropdown class="mr-16" :items="items" :popper="{
                            placement: 'left-start',
                            resize: true,
                            adaptive: true,
                        }">
                            <UButton color="white" label="Действия" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        </UDropdown>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="modalOpen = false" />
                    </div>
                </div>
            </template>
            <div>
                <CompanyExtractData :company="company" />
            </div>
            <div>
                <span class="text-2xl">Госпрограммы доступные для участия</span>
                <div class="grid grid-rows-4 grid-flow-col gap-4 mt-2">
                    <UCard v-for="program in company.fullCompliancePrograms">
                        <template #header>
                            <UButton color="black" variant="link" @click="opemProgramModal(program, 'all')"><span
                                    class="font-bold">{{ program.name
                                    }}</span></UButton>
                        </template>
                    </UCard>
                </div>
                <UDivider v-if="company.fullCompliancePrograms.length == 0" label="Нет" size="lg" />
            </div>
            <div>
                <span class="text-2xl">Частичное соответствие условиям</span>
                <div class="grid grid-rows-4 grid-flow-col gap-4 mt-2">
                    <UCard v-for="program in company.partialCompliancePrograms">
                        <template #header>
                            <UButton color="black" variant="link" @click=""><span class="font-bold"
                                    @click="opemProgramModal(program, 'partialCompliancePrograms')">{{ program.name
                                    }}</span></UButton>
                        </template>
                    </UCard>
                </div>
                <UDivider v-if="company.partialCompliancePrograms.length == 0" label="Нет" size="lg" />
            </div>
        </UCard>
        <UCard v-else>
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        <span class="font-medium text-3xl">{{ company.name }}</span>
                    </h3>
                    <div class="flex items-center">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="modalOpen = false" />
                    </div>
                </div>
            </template>
            <UDivider v-if="company.data == null || company.partialCompliancePrograms.length == 0"
                label="Данное предприятие еще не было проанализировано системой" size="lg" />
        </UCard>
    </UModal>
    <CompanyFormModal ref="modal" :userId="props.userId" @create-new-company="emit('updateCompany')"
        @close-modal="modalOpen = true" />
    <StateProgramInfo ref="modalProgram" />
</template>
