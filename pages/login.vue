<script setup>
    import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
    import { useAuthStore } from '../store/auth'; // import the auth store we just created

    const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

    const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
    const route = useRoute()
    const user = ref({
        username: 'kminchelle', 
        password: '0lelplR',
    });
    const login = async () => {
        await authenticateUser(user.value); // call authenticateUser and pass the user object
        // redirect to homepage if user is authenticated
        if (authenticated) {
            router.push('/');
        }
    };
</script>

<template>

</template>