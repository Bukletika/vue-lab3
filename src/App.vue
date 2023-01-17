<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import axios from 'axios'

import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    TheNavbar
  },

  setup() { 
    // задаем константы, аналогично data
    const store = useStore();

    const loadTasks = async function() {
      store.commit('setLoading', true);

      const { data } = await axios.get('https://lab3-1df07-default-rtdb.firebaseio.com/tasks.json');

      if (!data) {
        store.commit('setLoading', false);
        return;
      }

      const tasks = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key]
        }
      });

      store.dispatch('addTasksAsync', tasks)

      // this.addTasksAsync(tasks);
      store.commit('setLoading', false);
    }

    // метод composition Api mounted()
    onMounted(() => {
      loadTasks();
    })
  },
}
</script>