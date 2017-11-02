const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to database', err);
    } else {
        console.log('Connected to database');
        db.collection('Todos').find({completed: false}).count().then( (results) => {
            console.log('Count : ',results);
        }).catch( (err)=> {
            console.log(err);
        })
        db.close();
    }
});