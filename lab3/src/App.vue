<script setup>
import { reactive } from 'vue';
import { ref } from 'vue';
const user = reactive({
  userName: '',
  userSecondName: '',      
  gender: 'male', 
  password: '',
  checkPassword: ''
});

let showPassword = ref(false);

function sendData() {
  console.clear();
  console.log("Информация о пользователе");
  console.log(`Фамилия: ${user.userSecondName}\nИмя: ${user.userName}\nПол: ${user.gender === 'male' ? 'мужской': 'женский'}\nПароль: ${user.password}\nПроверка пароля: ${user.checkPassword}`);
};
</script>

<template>
  <form class="form">
    <h1>Форма регистрации</h1>
    <div class="standart">      
      <label for="usersecondname">Фамилия</label>
      <input type="text" id="usersecondname" v-model.trim="user.userSecondName" required>
    </div>
    <div class="standart">      
      <label for="username">Имя</label>
      <input type="text" id="username" v-model.trim="user.userName" required>
    </div>
    <div class="standart">
      <label style="width: 200px; ">Пол</label>
      <div class="radio-group">
        <div class="radio-option">
          <input class="gen" type="radio" id="male" v-model="user.gender" value="male" required>
          <label for="male">Мужской</label>
        </div>
        <div class="radio-option">
          <input style="margin-left: 20px;" class="gen" type="radio" id="female" v-model="user.gender" value="female">
          <label for="female">Женский</label>
        </div>  
      </div>    
    </div>
    <div class="standart">
      <label for="userpassword">Пароль</label>
      <input :type="showPassword ? 'text':'password'" id="userpassword" v-model="user.password" required>
    </div>  
    <div class="standart">
      <label for="checkuserpassword">Проверка пароля</label>
      <input :type="showPassword ? 'text':'password'" id="checkuserpassword" v-model="user.checkPassword" required>
    </div>   
    <button type="button" @mousedown="showPassword = true" @mouseup="showPassword = false"  id="showPasswords">Показать пароль</button>
    <button type="button" @click="sendData()" v-bind:disabled="user.password !== user.checkPassword" id="register">Зарегистрироваться</button>
    <p v-if="user.userName && user.userSecondName">Пользователь: {{ user.userName }} {{ user.userSecondName }}. {{ user.gender === 'male' ? 'Мужского' : 'Женского' }} пола.</p>
  </form>  
</template>

<style scoped>
  h1 {
    color: black;
  }
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;    
  }
  input{
    width: 300px;
    height: 20px;
    border-radius: 5px;
    border-style: double;
    border-color: black;
    font-size: 20px;
    font-family:'Times New Roman', Times, serif ;
    padding: 5px;
  }
  .block2{
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    margin-top: 10px;
  }
  .radio-option {
    display: flex;
    align-items: flex-end;
  }
  .radio-group {
    display: flex;
    justify-content: space-between;
    font-size: 17px;
  }  
  .standart {    
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    margin-bottom: 10px;  
    font-size: 22px;
  }  
  .gen {
    width: 20px;  
    margin-right: 5px;
    accent-color: red;
  }   
  #register {
    background-color:rgb(175, 201, 248);
    color: black;    
    width: 250px; 
    height: 40px; 
    border-radius: 10px;
    font-size: 25px;
    font-family:'Times New Roman', Times, serif;
    margin-top: 20px;
    cursor: pointer;
  } 
  #showPasswords {
    background-color:rgb(175, 248, 226);
    color: black;    
    width: 150px; 
    height: 20px; 
    border-radius: 10px;
    font-size: 15px;
    font-family:'Times New Roman', Times, serif;
    margin-top: 10px;
    cursor: pointer;
  }
</style>