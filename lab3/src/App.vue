<script setup>
import { ref } from 'vue';

const number = ref('');
const category = ref('trivia');
const fact = ref(null);
const isLoading = ref(false);
const error = ref(null);

const categories = [
  { value: 'trivia', label: 'Trivia (случайный факт)' },
  { value: 'math', label: 'Math (математический факт)' },
  { value: 'year', label: 'Year (факт о годе)' }
];

const fetchFact = async () => {
  if (!number.value) return;
  
  isLoading.value = true;
  error.value = null;
  fact.value = null;
  
  try {
    const response = await fetch(`http://numbersapi.com/${number.value}/${category.value}?json`);
    const data = await response.json();
    
    if (data.found) {
      fact.value = data.text;
    } else {
      error.value = `${number.value} - ${getBoringMessage()}`;
    }
  } catch (err) {
    error.value = 'Произошла ошибка при получении факта';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const getBoringMessage = () => {
  switch (category.value) {
    case 'year':
      return 'скучный год';
    default:
      return 'скучное число';
  }
};

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    fetchFact();
  }
};
</script>

<template>
  <div class="app">
    <h1>Факты о числах</h1>
    
    <div class="controls">
      <input
        v-model.number="number"
        type="number"
        placeholder="Введите число"
        @keypress="handleKeyPress"
        :disabled="isLoading"
      />
      
      <select
        v-model="category"
        :disabled="isLoading"
      >
        <option
          v-for="option in categories"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      
      <button
        @click="fetchFact"
        :disabled="isLoading || !number"
      >
        Поиск
      </button>
    </div>
    
    <div class="result">
      <div v-if="isLoading" class="loading">Загрузка...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="fact" class="fact">{{ fact }}</div>
      <div v-else class="placeholder">Введите число и нажмите "Поиск"</div>
    </div>
  </div>
</template>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input, select, button {
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input {
  flex: 1;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.result {
  min-height: 60px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.loading {
  color: #666;
  text-align: center;
}

.error {
  color: #d32f2f;
}

.fact {
  font-size: 18px;
  line-height: 1.5;
}

.placeholder {
  color: #999;
  text-align: center;
}
</style>