// Written by Andre Madarang https://github.com/drehimself/todo-vue/tree/05-laravel-api 
// Modified by Dongho Kim https://github.com/psy082/project_todo

<template>
  <div><label><input type="checkbox" :checked="!anyRemaining" @change="allChecked"> Check All</label></div>
</template>

<script>
export default {
    name: 'todo-check-all',
    computed: {
        anyRemaining() {
           return this.$store.getters.anyRemaining
        },
    },
    methods: {
        allChecked() {
            this.$store.dispatch('checkAll', event.target.checked)
        }
    }
}
</script>

