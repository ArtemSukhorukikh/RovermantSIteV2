<script lang="ts" setup>
</script>

<template>
  <UContainer>
    <h1 class="text-xl flex justify-center mt-8 text-zinc-500">Умные рекомендации</h1>
    <span class="flex justify-center text-4xl font-extrabold">Персонализированная помощь предпринимателям</span>
    <div class="mt-10 flex grid-cols-4 justify-between">
      <div
        class="pt-4 flex flex-col justify-start items-center  content-star rounded-lg bg-slate-50 w-40 h-40 border border-zinc-300">
        <div class="w-8 h-8 grow-0 justify-center items-center rounded-md bg-white border  border-slate-700">
          <UIcon class="w-8 h-8" name="i-heroicons-light-bulb" />
        </div>
        <div>
          <span
            class="p-2 flex justify-center font-sans text-slate-600 tracking-tighter text-center font-medium">Автоматический
            анализ
            данных о вашем
            предприятии.</span>
        </div>
      </div>

      <div
        class="pt-4 flex flex-col justify-start items-center  content-star rounded-lg bg-slate-50 w-40 h-40 border border-zinc-300">
        <div class="w-8 h-8 grow-0 justify-center items-center rounded-md bg-white border  border-slate-700">
          <UIcon class="w-8 h-8" name="i-heroicons-presentation-chart-bar" />
        </div>
        <div>
          <span
            class="p-2 flex justify-center font-sans text-slate-600 tracking-tighter text-center font-medium">Глубокий
            анализ текста
            государственных программ.</span>
        </div>
      </div>

      <div
        class="pt-4 flex flex-col justify-start items-center  content-star rounded-lg bg-slate-50 w-40 h-40 border border-zinc-300">
        <div class="w-8 h-8 grow-0 justify-center items-center rounded-md bg-white border  border-slate-700">
          <UIcon class="w-8 h-8" name="i-heroicons-light-bulb" />
        </div>
        <div>
          <span
            class="p-2 flex justify-center font-sans text-slate-600 tracking-tighter text-center font-medium">Проверка
            условий участия в программах.</span>
        </div>
      </div>

      <div
        class="pt-4 flex flex-col justify-start items-center  content-star rounded-lg bg-slate-50 w-40 h-40 border border-zinc-300">
        <div class="w-8 h-8 grow-0 justify-center items-center rounded-md bg-white border  border-slate-700">
          <UIcon class="w-8 h-8" name="i-heroicons-presentation-chart-bar" />
        </div>
        <div>
          <span
            class="p-2 flex justify-center font-sans text-slate-600 tracking-tighter text-center font-medium">Информационный
            кабинет для удобного доступа.</span>
        </div>
      </div>
    </div>

    <div>
      <span class="mt-14 flex justify-center text-4xl font-extrabold">Рекомендации по программам</span>
      <h1 class="text-xl flex justify-center mt-8 text-zinc-500">Интеллектуальный подход</h1>
      <div>
        <UAccordion class="mt-10 " color="black" variant="outline" size="xl" multiple :ui="{ span: { base: 'text-3xl' } }"
          :items="[{
            label: '1. Что такое интеллектуальная рекомендательная система?', content: 'Интеллектуальная рекомендательная система по государственным программам поддержки предприятий – это программно- аппаратный комплекс, основанный на методах искусственного интеллекта, предназначенный для автоматизированного анализа и предоставления информации о государственных программах поддержки бизнеса для МСП'
          }, { label: '2. Какие модули включает система ? ', content: 'Система включает модуль анализа информации о предприятии, модуль анализа текста государственных программ, модуль определения соответствия условий участия и информационный кабинет пользователя.' }, { label: '3. Как система помогает предпринимателям ? ', content: 'Система анализирует государственные программы поддержки и предоставляет предпринимателям персонализированные рекомендации о наиболее подходящих программах для участия.' }, { label: '4. Какие преимущества у системы ? ', content: 'Основное преимущество системы - способность быстро и точно анализировать большие объемы данных, что позволяет предпринимателям экономить время и увеличивать свои шансы на успех.' }]" />
      </div>
    </div>
  </UContainer>
</template>
