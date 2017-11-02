const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '59fab4b7e6a705103c0be0f5 ';

// Todo.find({
//     _id: id
// }).then( (todos) => {
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id : '59fab4b7e6a705103c0be0f5'
// }).then( (todo) =>{
//     console.log('Todo',todo);
// });

Todo.findById(id).then( (todo) => {
    console.log('Todo by Id :',todo);
}).catch((e) => console.log(e));