const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var  password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
})

var hashPassword = '$2a$10$xotcogsqDqS1CCuoWZ/HhOsE8iIn2xCEyLgz2lSIeng4ox13dqBiC'

bcrypt.compare(password, hashPassword, (err,result) => {
    console.log(result);
})
// console.log(jwt.sign(data, '123abc'));

// console.log(jwt.verify(jwt.sign(data, '123abc'), '123abc'));
// console.log(jwt.sign(data, '123abc'));

// console.log(jwt.verify(jwt.sign(data, '123abc'), '123abc'));