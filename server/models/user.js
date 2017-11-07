const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            isAsync: true,
            validator: validator.isEmail,
            message: '{VALUE} is not valid email address'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

//
UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                console.log(hash);
                next();
            });
        });
        
    } else {
        next();
    }

})

//Override JSON Method
UserSchema.methods.toJSON = function () {
    var user = this;
    //Convert mongoose obj to regular obj where available properties only exists
    var userObject = user.toObject();
    //Pick Email and token
    var picked = _.pick(userObject, ['_id', 'email']);

    return picked;
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    //Add token to array
    user.tokens.push({ access, token });

    //Return promise to chain it with server.js
    return user.save().then(() => {
        return token
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        //Check any error in token/ change in token
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
}
// newUser.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log('Unable to save to do app');
// });

