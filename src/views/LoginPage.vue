<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>Username: <input v-model="username" type="text" /></label>
      <label>Password: <input v-model="password" type="password" /></label>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref(null);
    const isLoggedIn = ref(!!localStorage.getItem('token'));  

    const login = async () => {
      try {
        const response = await axios.post('/api/auth/login', {
          username: username.value,
          password: password.value
        });
        localStorage.setItem('token', response.data.token);  
        isLoggedIn.value = true;  
        window.location.href = '/calendar';  
      } catch (e) {
        error.value = 'Login failed';
      }
    };

    return {
      username,
      password,
      error,
      login
    };
  }
};
</script>

