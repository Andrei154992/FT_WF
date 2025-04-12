<script setup>
import { ref, computed } from 'vue';

const history = ref( [] );
const title = ref('');
const amount0 = ref(null);

const incomeBalance = computed(() => {
  return history.value
  .filter(item => item.amount > 0)
  .reduce((sum, item) => sum + item.amount, 0);
});
    
const outcomeBalance = computed(() => {
  return Math.abs(history.value
  .filter(item => item.amount < 0)
  .reduce((sum, item) => sum + item.amount, 0));
});
    
const totalBalance = computed(() => {
  return incomeBalance.value - outcomeBalance.value;
});

function addHistoryComponenet(text, amount){
  if (text && amount !== null){
    if (typeof amount !== "number" || amount === 0) {
      alert("Некорректный ввод")
      return;
    }
    history.value.push({
      text,
      amount,
      id: Date.now()
    })
    title.value = '';
    amount0.value = null;
  }
  else {
    alert("Необходимо ввести название и сумму операции")
  }
};
</script>

<template>   
  <div class="main">
    <h1>Учёт расходов</h1>
    <div class="head">     
      <div class="window-input">
        <form class="form">
          <input class="standart" type="text" v-model.trim="title" placeholder="Название операции" required>
          <input class="standart" type="text" v-model.number="amount0" placeholder="Сумма операции" required>
          <button type="button" @click="addHistoryComponenet(title, amount0)">Добавить</button>
        </form> 
      </div>  
      <div class="balances">
        <div v-if="history.length > 0">
          <div class="balance-item total">
            <span>Баланс:</span>
            <span :class="totalBalance >= 0 ? 'income' : 'outcome'">
              {{ totalBalance }} ₽
            </span>
          </div>
          <div class="balance-item">
            <span>Доходы:</span>
            <span>{{ incomeBalance }} ₽</span>
          </div>
          <div class="balance-item">
            <span>Расходы:</span>
            <span>{{ outcomeBalance }} ₽</span>
          </div>
        </div>     
        <span v-else class="empty-history">Вы не совершали финансовых операций</span>     
      </div> 
    </div>
      <div class="history">
        <div v-if="history.length > 0">          
          <h2>История операций</h2>
            <ul>
              <li v-for="item in history" :key="item.id">
                <span class="operation-title">{{ item.text }}</span>
                <span :class="item.amount >= 0 ? 'income' : 'outcome'">
                  {{ item.amount >= 0 ? '+' : '' }}{{ item.amount }} ₽
                </span>
              </li>
            </ul>
        </div>        
      </div>
  </div>  
</template>

<style scoped>
  h1 {
    color: black;
    margin-left: 10px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
  }
  .head {
    display: flex;
    margin-right: 700px;
  }
  .standart {
    height: 25px;
    width: 250px;
    margin-bottom: 15px;
    border-radius: 5px;
    border-width: 2px;
    border-color: black;
    border-style: double;
    padding: 5px;
    font-size: 20px;    
    box-shadow: 0 1px 3px rgb(168, 168, 168);
  }
  .window-input {
    margin-bottom: 30px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 8px;
    width: 300px; 
  }
  .balances {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 8px;
    width: 800px;
    margin-left: 50px;
  }
  .balance-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    background: white;
    border-radius: 4px;
    width: 775px;
  }
  .balance-item.total {
    font-weight: bold;
    font-size: 1.1em;
    margin-top: 10px;
    margin-bottom: 15px;
    width: 775px;
  }
  button {
    height: 35px;
    width: 250px;
    margin-top: 10px;
    background-color: rgb(165, 203, 247);
    border-radius: 10px;
    border-width: 2px;
    border-color: black;
    border-style: double;
    color: black;
    font-size: 25px;
    font-family: 'Times New Roman', Times, serif ;
  }
  .history li {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    margin-bottom: 8px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgb(168, 168, 168);
    width: 1160px;
  }
  .history ul {
    list-style: none;
    padding: 0;
  }
  .operation-title {
    font-size: 20px;
  }
  .income {
    color: #42b983;
  }
  .outcome {
    color: #ff5252;
  }
  .empty-history {
    color: #141414;
    text-align: center;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    font-size: 25px;
  } 
</style>