<template>
    <div class="emoji-mixer">
      <div v-if="firstEmoji">
        <h2>Первый смайл:</h2>
        <Emoji :emoji="firstEmoji" />
      </div>
  
      <div v-if="secondEmoji">
        <h2>Второй смайл:</h2>
        <Emoji :emoji="secondEmoji" />
      </div>
  
      <div v-if="kitchenEmoji">
        <h2>Смиксованный смайл:</h2>
        <img :src="kitchenEmoji" alt="Смиксованный смайл" />
      </div>
  
      <p v-else>Выберите два смайла для смешивания!</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  import Emoji from './Emoji.vue';
  
  const props = defineProps({
    firstEmoji: {
      type: Object,
      default: null,
    },
    secondEmoji: {
      type: Object,
      default: null,
    },
  });
  
  const kitchenEmoji = computed(() => {
    if (props.firstEmoji && props.secondEmoji) {
      const unicodeFirst = props.firstEmoji.unicode[0].replace('U+', '').toLowerCase();
      const unicodeSecond = props.secondEmoji.unicode[0].replace('U+', '').toLowerCase();
      return `https://emk.vercel.app/s/${unicodeFirst}_${unicodeSecond}?size=96`;
    } else {
      return null; // Или можно вернуть изображение-заглушку
    }
  });
  </script>
  
  <style scoped>
  .emoji-mixer {
    text-align: center;
  }
  
  .emoji-mixer img {
    width: 96px;
    height: 96px;
  }
  </style>