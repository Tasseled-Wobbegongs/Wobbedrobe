const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTORY = 10; 
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// userSchema.pre('save', async function(next) {
//     const user = this; 

//     try {
//         const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

//         const hash = await bcrypt.hash(user.password, salt);

//         user.password = hash;

//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;