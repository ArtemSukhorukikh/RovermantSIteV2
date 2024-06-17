<script setup>
import { object, string } from "yup";
let company = ref({
  name: null,
  description: null,
});
const error = ref("");
let modalOpen = ref(false);
let id = ref("");
const emit = defineEmits(["createNewCompany", "closeModal"]);

const schema = object({
  name: string()
    .required("Данное поле обязательно для заполнения")
    .max(256, "Максимальная длинна названия предприятия 256 символов"),
  description: string()
    .required("Данное поле обязательно для заполнения")
    .max(10000, "Максимальная длинна описания предприятия 10000 символов"),
});

let state = reactive({
  name: company?.name ?? undefined,
  description: company?.description ?? undefined,
});

async function onSubmit(event) {
  // Do something with event.data
  console.log(event.data);
  const { error } = await $fetch("/api/company/create", {
    method: "POST",
    body: {
      name: event.data.name,
      description: event.data.description,
      userId: props.userId,
    },
  });

  if (error && error.value?.data?.message) {
    error = error.value.data.message;
  } else {
    emit("createNewCompany");
    modalOpen.value = false;
    state.name = undefined;
    state.description = undefined;
  }
}

function open(
  companyData = {
    id: null,
    name: null,
    description: null,
  }
) {
  console.log("open");
  modalOpen.value = true;
  company.value.name = companyData.value.name;
  company.value.description = companyData.value.description;
  id.value = companyData.value.id;
  console.log(companyData.value.name);
  console.log(company.description);
  state = reactive({
    name: company.value.name ?? undefined,
    description: company.value.description ?? undefined,
  });
}

function close() {
  modalOpen.value = false;
}

defineExpose({
  modalOpen,
  open,
});
</script>

<template>
  <UModal v-model="modalOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <span v-if="!company.name" class="font-medium text-3xl"
          >Добавление нового предприятия</span
        >
        <span v-else class="font-medium text-3xl"
          >Редактировать педприятие</span
        >
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Название предприятия" name="name">
          <UInput color="indigo" variant="outline" v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Описание преддприятия" name="description">
          <UTextarea
            v-model="state.description"
            :rows="20"
            color="indigo"
            variant="outline"
            size="xl"
            type="text"
          />
        </UFormGroup>

        <UAlert v-if="error" color="red" :title="error" />

        <UButton class="mr-8" color="indigo" variant="outline" type="submit">
          Сохранить
        </UButton>
        <UButton
          color="indigo"
          variant="outline"
          type="submit"
          @click="close()"
        >
          Закрыть
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
