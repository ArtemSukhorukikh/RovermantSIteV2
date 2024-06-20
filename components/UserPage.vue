<script setup>
import { useCompaniesStore } from "../store/companies";
import { object, string } from "yup";
import FullCompliancePrograms from "./FullCompliancePrograms.vue";
import UserCompanies from "./UserCompanies.vue";

const props = defineProps(["user"]);
const emit = defineEmits(["updateUser"]);

const { getCompanies } = useCompaniesStore();
let companies = ref(null);
let stateProgramsInfo = ref(null);
let countProgs = ref(null);
let countCompanies = ref(null);
const openUserEdit = ref(false);

const schema = object({
  email: string()
    .email("Поле должно иметь тип email")
    .required("Данное поле обязательно для заполнения"),
  password: string().required("Данное поле обязательно для заполнения"),
  name: string()
    .required("Данное поле обязательно для заполнения")
    .matches(/^[^\d]*$/, "Имя не должно содержать цифры"),
  surname: string()
    .required("Данное поле обязательно для заполнения")
    .matches(/^[^\d]*$/, "Фамилия не должно содержать цифры"),
  patronymic: string().matches(
    /^[^\d]*$/,
    "Отчество не должно содержать цифры"
  ),
});

let state = reactive({
  email: props.user?.email ?? undefined,
  password: undefined,
  name: props.user?.name ?? undefined,
  surname: props.user?.surname ?? undefined,
  patronymic: props.user?.patronymic ?? undefined,
});

getStateProgramInfo();

companies.value = await getCompanies(props.user.id);
countCompanies.value = companies?.value.length;

async function getUserCompanies() {
  companies.value = await $fetch(`/api/company/user/full/${props.user.id}`, {
    method: "GET",
  });
  countCompanies.value = companies.value.length;
}

async function getStateProgramInfo() {
  console.log(props.user);
  stateProgramsInfo.value = await $fetch(
    `/api/stateProgram/user/${props.user.id}`
  );
  countProgs.value = stateProgramsInfo.value.filter(
    (program) => program.fullComplianceCompanies.length > 0
  ).length;
}

const items = [
  {
    key: "companies",
    label: "Предприятия",
  },
  {
    key: "programs",
    label: "Доступные для участия госпрограммы",
  },
  {
    key: "programsAll",
    label: "Все госпрограммы",
  },
];

async function onSubmit(event) {
  const user = await $fetch("/api/user/edit", {
    method: "POST",
    body: {
      id: props.user.id,
      name: event.data.name,
      surname: event.data.surname,
      patronymic: event.data.patronymic,
      email: event.data.email,
      password: event.data.password,
    },
  });

  reloadNuxtApp();
  openUserEdit.value = false;
}
</script>

<template>
  <div class="grid">
    <div class="row-start-1 col-span-1 max-w-56">
      <div class="flex items-start">
        <UIcon name="i-mdi-account-circle-outline" class="w-6 h-6" dynamic />
        {{ user.surname }} {{ user.name }} {{ user.patronymic }}
        <UTooltip text="Редактирование пользователя">
          <UButton
            class="ml-8"
            icon="i-heroicons-adjustments-vertical-20-solid"
            size="sm"
            color="blue"
            variant="ghost"
            :trailing="false"
            @click="openUserEdit = true"
          />
        </UTooltip>
      </div>

      <div class="block mt-5">
        <span>Информация</span>
        <div v-if="companies">
          <UIcon
            name="i-material-symbols-location-away"
            class="w-6 h-6"
            dynamic
          />
          <span>Кол-во предприятий</span>
          {{ countCompanies }}
        </div>
        <div v-if="countProgs > 0">
          <UIcon
            name="i-material-symbols-finance-mode"
            class="w-6 h-6"
            dynamic
          />
          <span>Кол-во доступных госпрограмм</span>
          {{ countProgs }}
        </div>
      </div>
    </div>
    <UTabs :items="items" class="w-full row-start-1 col-span-4">
      <template #item="{ item }">
        <div v-if="item.key == 'companies'">
          <UserCompanies
            :companies="companies"
            :userId="user.id"
            @update-companies="getUserCompanies"
          />
        </div>
        <div v-if="item.key == 'programs'">
          <FullCompliancePrograms
            :statePrograms="stateProgramsInfo"
            :userId="user.id"
            @updateCompanies="getUserCompanies"
            mode="notAll"
          />
        </div>
        <div v-if="item.key == 'programsAll'">
          <FullCompliancePrograms
            :statePrograms="stateProgramsInfo"
            :userId="user.id"
            @updateCompanies="getUserCompanies"
            mode="all"
          />
        </div>
      </template>
    </UTabs>
  </div>
  <UModal v-model="openUserEdit">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Эл.почта" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Пароль" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UFormGroup label="Имя" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Фамилия" name="surname">
          <UInput v-model="state.surname" />
        </UFormGroup>

        <UFormGroup label="Отчество" name="patronymic">
          <UInput v-model="state.patronymic" />
        </UFormGroup>

        <UButton type="submit"> Сохранить изменения </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
