const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect to mongoDB - locally
// mongoose.connect('mongodb://localhost:27017/TodoApp', {
//     useMongoClient: true
// });

//---Remotely
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',{
    useMongoClient: true
});

//Export for use in other files ex-server.js
module.exports = {
    mongoose
};