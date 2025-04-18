<script setup>
import { ref, onMounted } from 'vue';
import EmojiList from './components/EmojiList.vue';
import EmojiMixer from './components/EmojiMixer.vue';

const emojis = ref([]);
const selectedSmiles = ref([null, null]);

const fetchEmojis = async () => {
  try {
    const response = await fetch('https://emojihub.yurace.pro/api/all');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    emojis.value = await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке эмоджи:', error);
    // Обработайте ошибку, например, отобразите сообщение пользователю
  }
};

const selectFirstEmoji = (emoji) => {
  selectedSmiles.value[0] = emoji;
};

const selectSecondEmoji = (emoji) => {
  selectedSmiles.value[1] = emoji;
};

onMounted(() => {
  fetchEmojis();
});
</script>

<template>
  <h1>EmojiKitchen</h1>
  <EmojiMixer :firstEmoji="selectedSmiles[0]" :secondEmoji="selectedSmiles[1]" />
  <div class="emoji-lists">
    <EmojiList :emojis="emojis" @selectEmoji="selectFirstEmoji" />
    <EmojiList :emojis="emojis" @selectEmoji="selectSecondEmoji" />
  </div>

  
</template>

<style scoped>
.emoji-lists {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
</style>