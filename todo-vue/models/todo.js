const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    due: {
        type: Date
    },
    note: {
        type: String
    },
    expired: {
        type: Boolean
    },
    completed: {
        type: Boolean
    },
    editing: {
        type: Boolean
    },
    recording: {
        type: Boolean
    }
}));

module.exports.Todo = Todo;