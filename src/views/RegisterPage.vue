<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label>Username: <input v-model="username" type="text" /></label>
      <label>Password: <input v-model="password" type="password" /></label>
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/auth/register', {
          username: this.username,
          password: this.password
        });
        this.$router.push('/login');  
      } catch (error) {
        this.error = 'Registration failed';
      }
    }
  }
};
</script>
