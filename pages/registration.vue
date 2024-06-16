<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth';

const { registrateUser } = useAuthStore()

const { authenticated, id } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const router = useRouter();
const user = ref({
    username: null,
    password: null,
    surname: null,
    name: null,
    patronymic: null
});
const registrate = async () => {
    await registrateUser(user.value); // call authenticateUser and pass the user object
    // redirect to homepage if user is authenticated
    if (authenticated) {
        router.push({
            path: `/profile/${id.value}`,
        });
    }
};
</script>

<template>
    <UContainer class=" items-center justify-center">
        <div>
            <span class="text-4xl font-semibold">Регистрация</span>
            <UFormGroup class="text-black" label="Эл. почта" required>
                <UInput color="indigo" variant="outline" placeholder="you@example.com" v-model="user.username" />
            </UFormGroup>
            <UFormGroup class="text-black" label="Фамилиия" required>
                <UInput color="indigo" variant="outline" placeholder="Иванов" v-model="user.surname" />
            </UFormGroup>
            <UFormGroup class="text-black" label="Имя" required>
                <UInput color="indigo" variant="outline" placeholder="Иван" v-model="user.name" />
            </UFormGroup>
            <UFormGroup class="text-black" label="Отчество">
                <UInput color="indigo" variant="outline" placeholder="Иванович" v-model="user.patronymic" />
            </UFormGroup>
            <UFormGroup class="text-black" label="Пароль" required>
                <UInput color="indigo" variant="outline" placeholder="Пароль" type="password" v-model="user.password" />
            </UFormGroup>
            <UButton class="mt-3 mr-7" color="indigo" variant="outline" @click.prevert="registrate">Регистрация
            </UButton>
        </div>
    </UContainer>
</template>