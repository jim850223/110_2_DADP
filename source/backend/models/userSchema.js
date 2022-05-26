const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,        
        required: [true, 'Username cannot be blank']        
    },
    email: {
        type: String,        
        required: [true, 'Email cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    //You cannot use 'collection as a filed becasue collection is a reserved schema in express.......'
    collectionSet: [{
        name: String,
        favorite: Boolean
    }]
})

module.exports = mongoose.model('User', userSchema);



/* const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']        
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']        
    }
})

module.exports = mongoose.model('User', userSchema); */