<template>
  <app-loader v-if="loading"></app-loader>

  <div class="card" v-else-if="currentTask && !loading">
    <h2>{{ currentTask.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="currentTask.status" /></p>
    <p>
      <strong>Дэдлайн</strong>:
      {{ new Date(currentTask.date).toLocaleDateString() }}
    </p>
    <p><strong>Описание</strong>: {{ currentTask.description }}</p>
    <div>
      <button class="btn" @click="changeStatus(taskId, 'progress')" v-if="currentTask.status != 'progress'">
        Взять в работу
      </button>
      <button class="btn primary" @click="changeStatus(taskId, 'done')" v-if="currentTask.status != 'done'">
        Завершить
      </button>
      <button class="btn danger" @click="changeStatus(taskId, 'disabled')" v-if="currentTask.status != 'disabled'">
        Отменить
      </button>
    </div>
  </div>

  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ taskId }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from "../components/AppStatus";

import AppLoader from "../components/AppLoader";
import axios from "axios";

import { useStore } from "vuex";

import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    // задаем константы, аналогично data
    const route = useRoute();
    const taskId = ref(route.params.taskId);

    const store = useStore();

    const tasks = computed(() => {
      return store.getters.tasks;
    });

    // функции
    const changeStatus = async function (id, status) {
      const newTasks = tasks.value.map((task) =>
        task.id == id ? { ...task, status: status } : task
      );

      await axios.put(`${process.env.VUE_APP_BASE_URL}/tasks/${id}.json`, {
        status: status,
        date: currentTask.value.date,
        description: currentTask.value.description,
        title: currentTask.value.title,
      });

      store.dispatch("changeTaskStatusAsync", newTasks);
    };

    // computed
    const currentTask = computed(() => {
      return tasks.value.find((task) => task.id == taskId.value);
    });

    const loading = computed(() => {
      return store.state.loading;
    });

    // возвращаем объект, который будет доступен в шаблоне
    return {
      taskId,
      changeStatus,
      currentTask,
      loading,
    };
  },
  components: { AppStatus, AppLoader },
};
</script>

<style scoped>
</style>