const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
}

console.log(jwt.sign(data, '123abc'));

console.log(jwt.verify(jwt.sign(data, '123abc'), '123abc'));