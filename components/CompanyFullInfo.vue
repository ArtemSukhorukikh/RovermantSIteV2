<script setup>
let modalOpen = ref(false);
let company = ref(null);
let modal = ref(null);

const items = [
  [
    {
      label: "Cформировать отчёт",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        console.log("Report");
      },
    },
  ],
  [
    {
      label: "Редактировать",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        modal.value.open(company);
      },
    },
    {
      label: "Удалить",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        console.log("Delete");
      },
    },
  ],
];

function open(companyData) {
  console.log(companyData);
  modalOpen.value = true;
  company.value = companyData;
}

defineExpose({
  modalOpen,
  open,
});
</script>

<template>
  <UModal v-model="modalOpen" :fullscreen="true" :prevent-close="true">
    <UCard
      :ui="{
        width: 'sm:max-w-xl',
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            <span class="font-medium text-3xl">{{ company.name }}</span>
          </h3>
          <div class="flex items-center">
            <UDropdown
              class="mr-16"
              :items="items"
              :popper="{
                placement: 'left-start',
                resize: true,
                adaptive: true,
              }"
            >
              <UButton
                color="white"
                label="Действия"
                trailing-icon="i-heroicons-chevron-down-20-solid"
              />
            </UDropdown>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="modalOpen = false"
            />
          </div>
        </div>
      </template>
      <div>
        <span>Извлеченный данные</span>
        <div></div>
      </div>
      <div>
        <span class="text-2xl">Госпрограммы доступные для участия</span>
        <div class="grid grid-rows-4 grid-flow-col gap-4 mt-2">
          <UCard v-for="program in company.fullCompliancePrograms">
            <template #header>
              <UButton color="black" variant="link" @click=""
                ><span class="font-bold">{{ program.name }}</span></UButton
              >
            </template>
          </UCard>
        </div>
        <UDivider
          v-if="company.fullCompliancePrograms.length == 0"
          label="Нет"
          size="lg"
        />
      </div>
      <div>
        <span class="text-2xl">Частичное соответствие условиям</span>
        <div class="grid grid-rows-4 grid-flow-col gap-4 mt-2">
          <UCard v-for="program in company.partialCompliancePrograms">
            <template #header>
              <UButton color="black" variant="link" @click=""
                ><span class="font-bold">{{ program.name }}</span></UButton
              >
            </template>
          </UCard>
        </div>
        <UDivider
          v-if="company.partialCompliancePrograms.length == 0"
          label="Нет"
          size="lg"
        />
      </div>
    </UCard>
  </UModal>
  <CompanyFormModal ref="modal" />
</template>
