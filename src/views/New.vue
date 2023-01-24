<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button
      class="btn primary"
      :disabled="isBtnDisabled"
      @click="addTaskToVuex"
    >
      Создать
    </button>
  </form>
</template>


<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    // задаем константы, аналогично data
    const title = ref("");
    const date = ref("");
    const description = ref("");

    // computed
    const isBtnDisabled = computed(() => {
      return (
        title.value.length <= 3 ||
        description.value.length <= 3 ||
        date.value.length < 10
      );
    });

    const addTaskToVuex = async function (evt) {
      evt.preventDefault();

      if (!isBtnDisabled.value) { // добавляем value у computed значения
        // Создадим задачу
        let task = {
          title: title.value,
          date: date.value,
          description: description.value,
          status: setStatus(),
        };

        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/tasks.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
          }
        );

        const firebaseData = await response.json();
        task.id = firebaseData.name;

        store.dispatch("addTaskAsync", task);

        // Очистка инпутов
        title.value = "";
        date.value = "";
        description.value = "";

        // Редирект
        router.push({ path: "/" });
      }
    };

    // Установить статус задачи
    const setStatus = function () {
      const currentDate = new Date();
      const calendarDate = new Date(date.value);

      let dm = currentDate - calendarDate;

      if (dm >= 86400000) {
        return "disabled";
      } else {
        return "active";
      }
    };

    // возвращаем объект, который будет доступен в шаблоне
    return {
      title,
      date,
      description,
      addTaskToVuex,
      isBtnDisabled,
    };
  },
};
</script>