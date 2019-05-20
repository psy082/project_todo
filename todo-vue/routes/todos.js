const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todo');

router.get('/', async (req, res) => {
    const todos = await Todo.find().sort('priority');
    res.send(todos);
});

router.post('/', async (req, res) => {
    let todo = new Todo({
        id: req.body.id,
        priority: req.body.priority,
        title : req.body.title,
        due : req.body.due,
        note: req.body.note,
        expired: req.body.expired,
        completed: req.body.completed,
        editing: req.body.editing,
        recording: req.body.recording
    });
    todo = await todo.save();
    res.send(todo);
});

router.patch('/:id', async (req, res) => {
    const updateObject = req.body;
    const todo = await Todo.findOneAndUpdate({id: req.params.id}, {$set: updateObject}, {new: true});

    if(!todo) return res.status(404).send('Todo with the given ID was not found.');

    res.send(todo);
});

router.delete('/:id', async (req, res) => {
    const todo = await Todo.findOneAndDelete({id: req.params.id});

    if(!todo) return res.status(404).send('Todo with the given ID was not found.');

    res.send(todo);
});

module.exports = router;
