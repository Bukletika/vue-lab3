<template>
  <div class="card">
    <h2 class="card-title">
      {{ data.title }}
      <AppStatus :type="data.status" />
    </h2>
    <p>
      <strong>
        <small>
          {{ new Date(data.date).toLocaleDateString() }}
        </small>
      </strong>
    </p>
    <button class="btn primary" @click="watchTask(data.id)">Посмотреть</button>
  </div>
</template>

<script>
import AppStatus from "@/components/AppStatus";

import { useRouter } from "vue-router";

export default {
  components: { AppStatus },
  props: {
    data: Object,
  },

  setup(props) {
    // задаем константы, аналогично data
    const router = useRouter();

    const watchTask = function (id) {
      router.push({ path: `/task/${id}` });
    };

    // возвращаем объект, который будет доступен в шаблоне
    return {
      watchTask,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>