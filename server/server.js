require('./../config/config');
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

//ADD users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    //body is Object containing email and password
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        //Custome Header
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//ADD Notes
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

//FETCH ALL NOTES
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    }, (err) => {
        res.status(400).send(err);
    });
});

//FETCH Notes by ID
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

//DELETE Notes
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

// UPDATE Notes
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
        Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
            if (!todo) {
                res.status(404).send();
            } else {
                res.status(200).send({ todo });
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