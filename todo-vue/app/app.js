const mongoose = require('mongoose');
const todos = require('../routes/todos');
const button = require('../routes/button');
const express = require('express');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost/TodoList')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(cors());
app.use('/api/button', button);
app.use('/api/todos', todos);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));