// Written by Andre Madarang https://github.com/drehimself/todo-vue/tree/05-laravel-api 
// Modified by Dongho Kim https://github.com/psy082/project_todo

<template>
  <div>
    <button :class="{ active: filter == 'all'}" @click="changeFilter('all')">All</button>
    <button :class="{ active: filter == 'active'}" @click="changeFilter('active')">Active</button>
    <button :class="{ active: filter == 'completed'}" @click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
export default {
    name: 'todo-filtered',
    computed: {
        filter() {
          return this.$store.state.filter
        }
    },
    methods: {
       changeFilter(filter) {
         this.$store.dispatch('updateFilter', filter)
       }
    }
}
</script>

