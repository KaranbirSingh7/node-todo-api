var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

module.exports = {
    User
}
// newUser.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log('Unable to save to do app');
// });

