<template>
  <app-loader v-if="loading"></app-loader>
  
  <h1 class="text-white center" v-else-if="tasks.length < 1 && !loading">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasksNum }}</h3>


    <div class="card" v-for="(task) in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.date).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="watchTask(task.id)">Посмотреть</button>
    </div>

  </template>

</template>

<script>
import AppStatus from '../components/AppStatus';

import AppLoader from "../components/AppLoader";

import { mapGetters } from 'vuex';

export default {
  components: {AppStatus, AppLoader},
  
  computed: {
    ...mapGetters(['tasks']),
    activeTasksNum() {
      return this.tasks.filter(task => task.status == 'active').length;
    },

    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    watchTask(id) {
      // Просмотреть задачу
      this.$router.push({ path: `/task/${id}` })
    }
  }
}
</script>
