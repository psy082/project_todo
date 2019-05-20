// Written by Andre Madarang https://github.com/drehimself/todo-vue/tree/05-laravel-api 
// Modified by Dongho Kim https://github.com/psy082/project_todo

<template>
    <div>{{ remaining }} item left </div>
</template>

<script>
export default {
    name: 'todo-remaining',
    computed: {
        remaining() {
            return this.$store.getters.remaining
        }
    }
}
</script>
