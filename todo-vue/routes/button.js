const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todo');

router.patch('/checkAll', async (req, res) => {
    const todo = await Todo.updateMany({}, {$set: {completed: req.body.completed}});

    if(!todo) return res.status(404).send('fail to change all.');

    res.send(todo);
});

router.delete('/clearCompleted', async (req, res) => {
    const todo = await Todo.deleteMany({completed: true});

    if(!todo) return res.status(404).send('fail to delete all completed items');

    res.send(todo);
});

module.exports = router;