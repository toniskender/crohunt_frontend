<template>
  <div>
    <h2>Add Calendar Entry</h2>
    <form @submit.prevent="createCalendarEntry">
      <label for="date">Select Date:</label>
      <input type="date" id="date" v-model="date" :min="minDate" required />

      <label for="huntingArea">Select Hunting Area:</label>
      <select id="huntingArea" v-model="huntingArea" required>
        <option value="Delnice">Delnice</option>
        <option value="Mrkopalj">Mrkopalj</option>
      </select>

      <button type="submit">Add Entry</button>
    </form>

    <h2>Your Calendar Entries</h2>
    <ul>
      <li v-for="entry in calendarEntries" :key="entry._id">
        Date: {{ new Date(entry.date).toLocaleDateString() }} --> Hunting Area: {{ entry.huntingArea }}
        <button @click="editEntry(entry)">Edit</button>
        <button @click="deleteEntry(entry._id)">Delete</button>
      </li>
    </ul>

    <div v-if="isEditing">
      <h2>Edit Calendar Entry</h2>
      <form @submit.prevent="updateCalendarEntry">
        <label for="editDate">Select Date:</label>
        <input type="date" id="editDate" v-model="editDate" :min="minDate" required />

        <label for="editHuntingArea">Select Hunting Area:</label>
        <select id="editHuntingArea" v-model="editHuntingArea" required>
          <option value="Delnice">Delnice</option>
          <option value="Mrkopalj">Mrkopalj</option>
        </select>

        <button type="submit">Update Entry</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      date: '',
      huntingArea: '',
      minDate: new Date().toISOString().split('T')[0],
      calendarEntries: [],
      isEditing: false,
      editId: null,
      editDate: '',
      editHuntingArea: ''
    };
  },
  methods: {
    
    async createCalendarEntry() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:5000/api/calendar',
      {
        date: this.date,
        huntingArea: this.huntingArea
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const newCalendar = response.data.newCalendar;

    
    newCalendar.date = newCalendar.date.split('T')[0];  

    this.calendarEntries.push(newCalendar);  
    this.date = '';  
    this.huntingArea = '';
  } catch (error) {
    console.error('Error creating calendar entry:', error);
  }
},


    
    async fetchCalendarEntries() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/calendar', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.calendarEntries = response.data;  
      } catch (error) {
        console.error('Error fetching calendar entries:', error);
      }
    },

    
    editEntry(entry) {
      this.isEditing = true;
      this.editId = entry._id;
      this.editDate = entry.date;
      this.editHuntingArea = entry.huntingArea;
    },

    
    async updateCalendarEntry() {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `http://localhost:5000/api/calendar/${this.editId}`,
          {
            date: this.editDate,
            huntingArea: this.editHuntingArea
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.fetchCalendarEntries();  
        this.isEditing = false;
        this.editId = null;
      } catch (error) {
        console.error('Error updating calendar entry:', error);
      }
    },

    
    async deleteEntry(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/calendar/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.calendarEntries = this.calendarEntries.filter(entry => entry._id !== id);
      } catch (error) {
        console.error('Error deleting calendar entry:', error);
      }
    }
  },
  mounted() {
    this.fetchCalendarEntries();  
  }
};
</script>

