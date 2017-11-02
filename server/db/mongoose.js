const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});

module.exports = {
    mongoose
};