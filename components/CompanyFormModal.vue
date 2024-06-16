<script setup>
import { object, string } from 'yup'
const props = defineProps(['company'])
const error = ref('')
let modalOpen = ref(false)
const emit = defineEmits(['createNewCompany', 'closeModal'])

const schema = object({
    'name': string().required("Данное поле обязательно для заполнения").max(256, 'Максимальная длинна названия предприятия 256 символов'),
    'description': string().required("Данное поле обязательно для заполнения").max(10000, 'Максимальная длинна описания предприятия 10000 символов')
})

const state = reactive({
    'name': props?.company?.name ?? undefined,
    'description': props?.company?.description ?? undefined
})

async function onSubmit(event) {
    // Do something with event.data
    console.log(event.data)
    const { error } = await $fetch('/api/company/create', {
        method: 'POST',
        body: {
            name: event.data.name,
            description: event.data.description,
            userId: props.userId
        }
    })

    if (error && error.value?.data?.message) {
        error = error.value.data.message
    } else {
        emit('createNewCompany')
        modalOpen.value = false
        state.name = undefined
        state.description = undefined
    }
}

function open() {
    modalOpen.value = true
}

defineExpose({
    modalOpen,
    open
})
</script>

<template>
    <UModal v-model="modalOpen" @close="emit('closeModal')">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <span class="font-medium text-3xl">Добавление нового предприятия</span>
            </template>

            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Название предприятия" name="name">
                    <UInput color="indigo" variant="outline" v-model="state.name" />
                </UFormGroup>

                <UFormGroup label="Описание преддприятия" name="description">
                    <UTextarea v-model="state.description" :rows="20" color="indigo" variant="outline" size="xl"
                        type="text" />
                </UFormGroup>

                <UAlert v-if="error" color="red" :title="error" />

                <UButton color="indigo" variant="outline" type="submit">
                    Сохранить
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>