const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

var todos = [{
    _id: new ObjectID(),
    text: 'First todo'
}, {
    _id: new ObjectID(),
    text: 'Second todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => done());
})

describe('POST /todos', () => {
    // TestCase #1
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos') //Make request to todo app
            .send({         // Send data to mongoDB through server
                text: text
            })
            .expect(200)  //Expect statusCode to be 200
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })          //Response body TEXT = Request TEXT
            .end((err, res) => {
                if (err) {
                    done(err); //error occurs and stop everything
                } else {
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }).catch((e) => done(e));
                }
            });
    });
    it('should not create a new todo', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    Todo.find().then(todos => {
                        expect(todos.length).toBe(0);
                        done();
                    }).catch((e) => done(e));
                }
            });
    });
});


describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
});