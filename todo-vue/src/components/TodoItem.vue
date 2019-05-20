// Written by Andre Madarang https://github.com/drehimself/todo-vue/tree/05-laravel-api 
// Modified by Dongho Kim https://github.com/psy082/project_todo

<template>
    <div class="todo-item">
        <div class="todo-item-col">
            <div class="todo-item-left">
              <input type="checkbox" v-model="completed" @change="doneEdit">
              <input type="number" min="1" max="9" v-model="priority" @change="doneEdit">
              <double-click v-if="!editing" @single-click="recordTodo" @double-click="editTodo" class="todo-item-label" :class="{ completed : completed }">{{ title }}</double-click>
              <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>  
            </div>
            <div v-if="recording" v-click-outside="doneRecord" @keyup.enter="doneRecord" @keyup.esc="cancelRecord">
              <input type="datetime-local" class="todo-item-date" v-model="due"> 
              <input type="text" class="todo-item-note" v-model="note" v-focus placeholder="내용을 기록하세요">
            </div>
        </div>
        <div style="display: flex">
            <div v-if="expired" class="todo-item-expired">expired!</div>
            <span class="remove-item" @click="removeTodo(todo.id, todo.priority)">
                &times;
            </span>
        </div>

    </div>
</template>

<script>
import DoubleClick from './DoubleClick'
import vClickOutside from 'v-click-outside'
const moment = require('moment-timezone');

export default {
    name: 'todo-item',
    components: {
        DoubleClick,
    },
    props: {
        todo: {
            type: Object,
            required: true,
        },
        checkAll: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            'id': this.todo.id,
            'priority': this.todo.priority,
            'title': this.todo.title,
            'due': this.todo.due,
            'note': this.todo.note,
            'completed': this.todo.completed,
            'expired': this.todo.expired,
            'editing': this.todo.editing,
            'recording': this.todo.recording,
            'beforeEditCache': '',
            'beforeNoteCache': '',
        }
    },
    created() {
        eventBus.$on('expired', this.handleExpire)
    },
    beforeDestroy() {
        eventBus.$off('expired', this.handleExpire)
    },
    watch: {
        checkAll() {
            this.completed = this.checkAll ? true : this.todo.completed 
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
              el.focus()
            }
        },
        clickOutside: vClickOutside.directive
    },
    methods: {
        removeTodo(id, priority) {
            this.$store.dispatch('deleteTodo', id)
        },
        editTodo() {
            this.beforeEditCache = this.title
            this.editing = true
        },
        doneEdit() {
          if(this.title.trim() == '') {
              this.title = this.beforeEditCache
          }
          this.editing = false
          this.$store.dispatch('updateTodo', {
            'id': this.id,
            'priority': this.priority,
            'title': this.title,
            'due': this.due,
            'note': this.note,
            'completed': this.completed,
            'expired': this.expired,
            'editing': this.editing,
            'recording': this.recording,
          })
          eventBus.$emit('expired')
        },
        cancelEdit() {
          this.title = this.beforeEditCache
          this.editing = false
        },
        recordTodo() {
            this.beforeNoteCache = this.note
            this.recording = true
        },
        doneRecord(event) {
            if(this.note.trim() == ''){
                this.note = this.beforeNoteCache
            }
            this.recording = false
            this.$store.dispatch('updateTodo', {
                'id': this.id,
                'priority': this.priority,
                'title': this.title,
                'due': this.due,
                'note': this.note,
                'completed': this.completed,
                'expired': this.expired,
                'editing': this.editing,
                'recording': this.recording,
            })
            eventBus.$emit('expired')
        },
        cancelRecord() {
            this.note = this.beforeNoteCache
            this.recording = false
        },
        handleExpire() {
            const currentOffset = new Date().getTimezoneOffset() * 60000;
            const current = new Date(Date.now() - currentOffset).toISOString().slice(0, 16);

            if(!this.expired && moment(current) > moment(this.due)){
                this.expired = !this.expired
                this.$store.dispatch('updateTodo', {
                    'id': this.id,
                    'priority': this.priority,
                    'title': this.title,
                    'due': this.due,
                    'note': this.note,
                    'completed': this.completed,
                    'expired': this.expired,
                    'editing': this.editing,
                    'recording': this.recording,
                })
            }
            else if(this.expired && moment(current) < moment(this.due)){
                this.expired = !this.expired
                this.$store.dispatch('updateTodo', {
                    'id': this.id,
                    'priority': this.priority,
                    'title': this.title,
                    'due': this.due,
                    'note': this.note,
                    'completed': this.completed,
                    'expired': this.expired,
                    'editing': this.editing,
                    'recording': this.recording,
                })
            }
        }
    }
}
</script>


