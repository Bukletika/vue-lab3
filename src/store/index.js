import { createStore } from 'vuex'

export default createStore({
  
  state() {
    return {
      tasks: [],
      loading: false
    }
  },
  getters: {
    tasks(state) {
      return state.tasks
    }
  },
  mutations: {
    // saveData(state) {
    //   let parsed = JSON.stringify(state.tasks); // Преобразовать объект в строку для localstorage
    //   localStorage.setItem('tasks', parsed);
    // },

    setLoading(state, value) {
      state.loading = value;
    },

    addTask(state, value) {
      state.tasks.push(value);
      // this.commit('saveData');
    },

    addTasks(state, value) {
      state.tasks = value;
    },
    changeTaskStatus(state, value) {
      state.tasks = value;
    }
  },
  actions: {
    addTaskAsync(context, payload) {
      context.commit('addTask', payload);
    },
    addTasksAsync(context, payload) {
      context.commit('addTasks', payload);
    },
    changeTaskStatusAsync(context, payload) {
      context.commit('changeTaskStatus', payload);
    }
  },
  modules: {

  }
})
