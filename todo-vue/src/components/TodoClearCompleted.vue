// Written by Andre Madarang https://github.com/drehimself/todo-vue/tree/05-laravel-api 
// Modified by Dongho Kim https://github.com/psy082/project_todo

<template>
  <div>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
  </div>
</template>

<script>
export default {
    name: 'todo-clear-completed',
    computed: {
        showClearCompletedButton() {
            return this.$store.getters.showClearCompletedButton
        }
    },
    methods: {
      clearCompleted() {
        this.$store.dispatch('clearCompleted')
      }
    }
}
</script>

