<template>
    <div>
      <h2>Hunting Logs</h2>
      <ul>
        <li v-for="log in logs" :key="log._id">
          {{ log.date }}: {{ log.description }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'HuntingLogsPage',
    data() {
      return {
        logs: []
      };
    },
    async mounted() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/logs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.logs = response.data;
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>