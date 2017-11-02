const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

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
                if(err){
                    done(err);
                } else {
                    Todo.find().then(todos => {
                        expect(todos.length).toBe(0);
                        done();
                    }).catch((e) => done(e));
                }
            });
    });
})