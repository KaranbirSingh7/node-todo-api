//Libraries
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
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
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    } else {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                res.status(404).send();
            } else {
                res.status(200).send(todo);
            }
        }, (err) => {
            res.status(400).send();
        })
    }
})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    } else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                res.status(404).send();
            } else {
                res.status(200).send(todo);
            }
        }, (err) => {
            res.status(400).send();
        });
    }
})


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    //Pull things that user can have access
    var body = _.pick(req.body, ['text', 'completed']);

    //Check ID validation
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    } else {
        //if user completed Task then add completedAt
        if (_.isBoolean(body.completed) && body.completed) {
            //Completed task set timeStamp
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false; //Task not completed
            body.completedAt = null; 
        }
        //Update $set everything that user entered
        Todo.findByIdAndUpdate(id, {$set: body}, {new : true}).then( (todo) => {
            if (!todo) {
                res.status(404).send();
            } else {
                res.status(200).send({todo});
            }
        }).catch((e) => res.status(400).send());
    }
});

app.listen(port, () => {
    console.log('Server is up on port', port);
});

module.exports = {
    app
}