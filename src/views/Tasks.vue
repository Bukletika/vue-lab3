<template>
  <app-loader v-if="loading"></app-loader>

  <h1 class="text-white center" v-else-if="tasks.length < 1 && !loading">
    Задач пока нет
  </h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasksNum }}</h3>

    <AppCard v-for="task in tasks" :key="task.id" :data="task" />
  </template>
</template>

<script>
import AppLoader from "../components/AppLoader";
import AppCard from "../components/AppCard";

import { computed } from "vue";

import { useStore } from "vuex";

export default {
  components: { AppLoader, AppCard },

  setup() {
    const store = useStore();

    const tasks = computed(() => store.getters.tasks);

    const activeTasksNum = computed(
      () => store.getters.activeTasksCount
    );
    const loading = computed(() => store.state.loading);

    return {
      tasks,
      activeTasksNum,
      loading,
    };
  },
};
</script>
