<script setup>
const props = defineProps(['company'])
</script>

<template>
    <span class="text-2xl">Извлеченный данные</span>
    <li v-for="(data, key) in props.company.data"> {{ data.label }}: {{ data.value }}</li>
</template>