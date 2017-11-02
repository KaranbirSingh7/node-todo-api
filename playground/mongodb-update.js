const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to database');
    } else {
        console.log('Connection Successful');

        //Update
        db.collection('Users').findOneAndUpdate({
            location: 'Brampton, Ontario'
        },{
            $inc : {
                age: -6
            }
        },{
            returnOriginal : false
        }).then( (result)=>{
            console.log(result);
        }).catch ((err) => {
            console.log('Problem with query');
        });

        db.close();
    }
})