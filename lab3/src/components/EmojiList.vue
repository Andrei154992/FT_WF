<template>
    <div class="emoji-list">
      <div
        v-for="emoji in emojis"
        :key="emoji.name"
        class="emoji-item"
        @click="selectEmoji(emoji)"
      >
        <Emoji :emoji="emoji" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import Emoji from './Emoji.vue';
  
  const props = defineProps({
    emojis: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['selectEmoji']);
  
  const selectEmoji = (emoji) => {
    emit('selectEmoji', emoji);
  };
  </script>
  
  <style scoped>
  .emoji-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 400px; /* Ограничьте ширину списка */
  }
  
  .emoji-item {
    padding: 5px;
    font-size: 2em; /* Сделайте эмоджи больше */
    cursor: pointer;
    transition: background-color 0.2s ease; /* Добавьте плавную анимацию */
  }
  
  .emoji-item:hover {
    background-color: #f0f0f0;
  }
  </style>