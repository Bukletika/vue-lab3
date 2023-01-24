<template>
  <span :class="['badge', status.statusClass]">{{ status.name }}</span>
</template>
<script>
import { computed } from "vue";
export default {
  props: {
    type: String,
    validator(value) {
      return['active', 'done', 'progress', 'disabled'].includes(value);
    }
  },

  setup(props) {
    
    const status = computed(() => {
      const statusVariants = {
        active: { statusClass: "primary", name: "Активен" },
        done: { statusClass: "primary", name: "Завершен" },
        disabled: { statusClass: "danger", name: "Отменен" },
        progress: { statusClass: "warning", name: "Выполняется" },
      };

      return statusVariants[props.type];
    });

    return {
      status,
    };
  },

};
</script>