//Libraries
var express = require('express');
var bodyParser = require('body-parser');

// Local imports
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((results) => {
        res.send(results);
        console.log(results);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    }, (err) => {
        res.statud(400).send(err);
    });
});

app.listen(port, () => {
    console.log('Server is up on port',port);
});

module.exports = {
    app
}