// Written by Andre Madarang https://github.com/drehimself/todo-vue/tree/05-laravel-api 
// Modified by Dongho Kim https://github.com/psy082/project_todo

<template>
  <div>
    <input type="text" class="todo-input" placeholder="해야할 일" v-model="newTodo" @keyup.enter="addTodo">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
      </todo-item>
      </transition-group> 

      <div class="extra-container">
        <todo-check-all></todo-check-all>
        <todo-items-remaining></todo-items-remaining>
      </div>

      <div class="extra-container">
        <todo-filtered ></todo-filtered>

        <div>
            <transition name="fade">
                <todo-clear-completed></todo-clear-completed>
            </transition>
        </div>
      </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import draggable from 'vuedraggable'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'
const uniqid = require('uniqid');

export default {
  name: 'todo-list',
  components: {
      TodoItem,
      draggable,
      TodoItemsRemaining,
      TodoCheckAll,
      TodoFiltered,
      TodoClearCompleted,
  },
  data () {
    return {
      newTodo: '',
      idForTodo: uniqid(),
      priority: this.$store.getters.count + 1
    }
  },
  created() {
      this.$store.dispatch('retrieveTodos')
  },
  computed: {
      anyRemaining() {
          return this.$store.getters.anyRemaining
      },
      todosFiltered() {
          return this.$store.getters.todosFiltered
      },
  },
  methods: {
      addTodo() {
          if(this.newTodo.trim().length == 0) {
              return
          }
          console.log('add to TodoList')
          this.$store.dispatch('addTodo', {
              id: this.idForTodo,
              priority: this.$store.getters.count + 1,
              title: this.newTodo,
              due: '',
              note: '',
          })

          this.newTodo = ''
          this.idForTodo = uniqid()
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

    .todo-input {
        width: 100%;
        padding: 10px, 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus {
            outline: 10;
        }
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }

    .remove-item {
        display: flex;
        cursor: pointer;
        margin-left: 14px;
        &:hover {
            color: red;
        }
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-col {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 90%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }

    .todo-item-date {
        font-size: 12px;
        color: #2c3e50;
        margin-left: 12px;
        width: 90%;
        padding: 3px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }

    .todo-item-note {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 90%;
        height: auto;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }
    .todo-item-expired {
        display: flex;
        padding: 7px;
        color: red;
        font-size: 16px;
        margin-left: 14px;
    }

    .completed {
        text-decoration: line-through;
        color: gray;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgray;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none;

        &:hover {
            background: lightgreen;
        }

        &:focus {
            outline: none;
        }
    }

    .active {
        background: lightgreen;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .face-leave-to {
        opacity: 0;
    }
</style>
