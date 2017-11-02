// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        console.log('Unable to connect to mongo db server');
    } else {
        console.log('Connected to MongoDB server');
        //---Collection == Table in SQL
        db.collection('Users').insertOne({
            name: 'Karanbir Singh',
            age: 25,
            location: 'Toronto'
        }, (err, res) => {
            if (err){
                console.log('Unable to insert to table/collection',err)
            } else {
                console.log(res.ops, undefined, 4);
                console.log(res.ops[0]._id.getTimestamp());
            }
        })
        db.close();
    }
});