<script setup>
import { object, string, mixed } from "yup";
const { handleFileInput, files } = useFileStorage();
const programs = ref(null);
const { data } = await useFetch("/api/stateProgram/all");
programs.value = data;
const openCreateModal = ref(false);
const isOpenEditForm = ref(false);
const showAddFile = ref(true);
const needReindex = ref(false);
const selectedId = ref(null);

const options = [
  { label: "Постановление правительства", value: "program" },
  { label: "Новость", value: "new" },
];

const schema = object({
  name: string().required("Поле обязательно для заполнения"),
  resource: string().required("Поле обязательно для заполнения"),
  path: mixed(),
  url: string().url("Поле должно иметь тип строка"),
});

let state = reactive({
  name: undefined,
  resource: undefined,
  path: undefined,
  url: undefined,
});

function addFile(event) {
  state.path = event.target.files[0];
  if (isOpenEditForm.value) {
    needReindex.value = true;
  }
  handleFileInput(event);
}

function openEditForm(stateProgram) {
  state.name = stateProgram.name;
  state.resource = stateProgram.resource;
  state.path = stateProgram.path ?? undefined;
  state.url = stateProgram.url ?? undefined;
  openCreateModal.value = true;
  isOpenEditForm.value = true;
  selectedId.value = stateProgram.id;
  showAddFile.value = false;
}

function closeModal() {
  state = reactive({
    name: undefined,
    resource: undefined,
    path: undefined,
    url: undefined,
  });
  showAddFile.value = true;
  isOpenEditForm.value = false;
  selectedId.value = null;
}

function editFiles() {
  showAddFile.value = true
  state.path=undefined
  state.url=undefined
}

const validate = (state) => {
  const errors = [];
  if (!state.path && !state.url)
    errors.push({
      path: "path",
      message: "Обязательно указать или файл или ссылку на pdf файл",
    });
  if (!state.path && !state.url)
    errors.push({
      path: "url",
      message: "Обязательно указать или файл или ссылку на pdf файл",
    });
  if (state.path && state.url) {
    errors.push({
      path: "url",
      message: "Укажите либо url либо путь",
    });
  }
  if (
    state.path &&
    state.path.type &&
    !state.path.type.includes("application/pdf")
  ) {
    errors.push({
      path: "path",
      message: "Не допустимый формат файла",
    });
  }
  return errors;
};

async function onSubmit() {
  let data = {
    name: state.name,
    resource: state.resource,
  };

  if (state.path) {
    data.path = files.value[0];
  } else if (state.url) {
    data.url = state.url;
  }

  if (isOpenEditForm.value) {
    data.needReindex = needReindex.value;
    data.id = selectedId.value;
    const result = await $fetch("/api/stateProgram/update", {
      method: "POST",
      body: data,
    });
  } else {
    const result = await $fetch("/api/stateProgram/create", {
      method: "POST",
      body: data,
    });
  }

  const { dataResponce } = await $fetch("/api/stateProgram/all", {
    method: "GET",
  });
  programs.value = dataResponce;
  openCreateModal.value = false;
  reloadNuxtApp();
}

async function deleteProgram(program) {
  await $fetch("/api/stateProgram/delete", {
    method: "POST",
    body: { ids: [program.id] },
  });
  reloadNuxtApp();
}

async function onSubmitEditForm() {
  let data = {
    name: state.name,
    resource: state.resource,
  };

  if (state.path) {
    data.path = files.value[0];
  } else if (state.url) {
    data.url = state.url;
  } else {
    return;
  }
  const result = await $fetch("/api/stateProgram/update", {
    method: "POST",
    body: data,
  });
}
let modalProgram = ref(null);

function opemProgramModal(program, mode) {
  modalProgram.value.open(program, mode);
}
</script>

<template>
  <UContainer>
    <UButton
      class="my-5 flex flex-row-reverse"
      color="blue"
      variant="solid"
      @click="openCreateModal = true"
      >Добавить новую госпрограмму</UButton
    >
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th
            class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Название
          </th>
          <th
            class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Ресурс
          </th>
          <th
            class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Статус
          </th>
          <th
            class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Условия
          </th>
          <th
            class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Действия
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in programs.value" class="bg-white">
          <td class="py-2 px-4 border-b border-gray-200">{{ item.id }}</td>
          <td class="py-2 px-4 border-b border-gray-200">
            <ULink
              active-class="text-primary"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              @click="opemProgramModal(item, 'all')"
            >
              {{ item.name }}</Ulink
            >
          </td>
          <td class="py-2 px-4 border-b border-gray-200">
            <span v-if="item.resource == 'program'"
              >Постановление правительства</span
            >
            <span v-else>Новость</span>
          </td>
          <td class="py-2 px-4 border-b border-gray-200">
            <span v-if="item.status == 'NEEDINDEXED'">Не проиндексировано</span>
            <span v-else>Проиндексировано</span>
          </td>
          <td class="py-2 px-4 border-b border-gray-200">
            <ul>
              <li v-for="condition in item.conditions">
                {{ condition.condition }}
              </li>
            </ul>
          </td>
          <td class="py-2 px-4 border-b border-gray-200">
            <button
              @click="openEditForm(item)"
              class="text-blue-600 hover:text-blue-900"
            >
              Изменить
            </button>
            <button
              @click="deleteProgram(item)"
              class="text-red-600 hover:text-red-900 ml-2"
            >
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </UContainer>
  <UModal v-model="openCreateModal" @close="closeModal">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header> </template>

      <UForm
        :schema="schema"
        :state="state"
        :validate="validate"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Название госпрограммы" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Тип ресурса" name="resource">
          <USelect
            v-model="state.resource"
            placeholder="Ресурс"
            :options="options"
          />
        </UFormGroup>

        <UFormGroup v-if="showAddFile" label="Файл" name="path">
          <input
            type="file"
            @input="addFile"
            class="p-1 w-full text-slate-500 text-sm rounded-full leading-6 file:bg-violet-200 file:text-violet-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded-full hover:file:bg-violet-100 border border-gray-300"
          />
        </UFormGroup>

        <UFormGroup v-if="showAddFile" label="Url файла" name="url">
          <UInput v-model="state.url" />
        </UFormGroup>

        <UFormGroup
          v-if="!showAddFile"
          label="Изменить данные файла?"
          name="url"
        >
          <UButton label="Да" @click="editFiles" />
        </UFormGroup>

        <UButton type="submit"> Сохранить </UButton>
      </UForm>
    </UCard>
  </UModal>
  <StateProgramInfo ref="modalProgram" />
</template>
