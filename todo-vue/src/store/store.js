// Written by Andre Madarang https://github.com/drehimself/todo-vue/tree/05-laravel-api 
// Modified by Dongho Kim https://github.com/psy082/project_todo

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:5000/api'

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: []
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0
        },
        todosFiltered(state) {
            if(state.filter == 'all'){
                return state.todos
            } else if (state.filter == 'active') {
                return state.todos.filter(todo => !todo.completed)
            } else if (state.filter == 'completed') {
                return state.todos.filter(todo => todo.completed)
            }
            
            return state.todos
        },
        showClearCompletedButton(state) {
            return state.todos.filter(todo => todo.completed).length > 0
        }, 
        count(state) {
            return state.todos.length
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                priority: todo.priority,
                title: todo.title,
                due: '',
                note: '',
                completed: false,
                expired: false,
                editing: false,
                recording: false,
            })
        },
        updateTodo(state, todo) {
            if(todo.due !== null){
                todo.due = todo.due.slice(0, 16)
            }
            const index = state.todos.findIndex((item) => item.id == todo.id)
            state.todos.splice(index, 1, {
              'id': todo.id,
              'priority': todo.priority,
              'title': todo.title,
              'due': todo.due,
              'note': todo.note,
              'completed': todo.completed,
              'expired': todo.expired,
              'editing': todo.editing,
              'recording': todo.recording,
            })
        },
        deleteTodo(state, id){
            const index = state.todos.findIndex((item) => item.id == id)
            state.todos.splice(index, 1)
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        checkAll(state, checked){
            state.todos.forEach((todo) => (todo.completed = checked))
        },
        updateFilter(state, filter) {
            state.filter = filter
        },
        retrieveTodos(state, todos) {
            state.todos = todos
            state.todos.forEach((todo) => {
                if(todo.due !== null){
                    todo.due = todo.due.slice(0, 16)
                }
            })
        }
    },
    actions: {
        retrieveTodos(context) {
            axios.get('/todos')
                .then(res => {
                    context.commit('retrieveTodos', res.data)
                })
                .catch(err => console.error(err))
        },
        addTodo(context, todo) {
            axios.post('/todos', {
                id: todo.id,
                priority: todo.priority,
                title: todo.title,
                due: '',
                note: '',
                completed: false,
                expired: false,
                editing: false,
                recording: false,
            })
            .then(res => {
                context.commit('addTodo', res.data)
            })
            .catch(err => console.error(err))
        },
        updateTodo(context, todo) {
            axios.patch('/todos/' + todo.id, {
                priority: todo.priority,
                title: todo.title,
                due: todo.due,
                note: todo.note,
                completed: todo.completed,
                expired: todo.expired,
                editing: todo.editing,
                recording: todo.recording,
            })
            .then(res => {
                context.commit('updateTodo', res.data)
            })
            .catch(err => console.error(err))
        },
        deleteTodo(context, id) {
            axios.delete('/todos/' + id)
            .then(res => {
                context.commit('deleteTodo', id)
            })
            .catch(err => console.error(err))
        },
        checkAll(context, checked) {
            axios.patch('/button/checkAll', {
                completed: checked,
            })
            .then(res => {
                context.commit('checkAll', checked)
            })
            .catch(err => console.error(err))
        },
        updateFilter(context, filter) {
            setTimeout(() => {
               context.commit('updateFilter', filter)
            }, 100)
        },
        clearCompleted(context) {
            axios.delete('/button/clearCompleted')
            .then(res => {
                context.commit('clearCompleted')
            })
            .catch(err => console.error(err))
        },
    }
})