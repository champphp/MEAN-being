const mongoose = require('mongoose');
const validator = require('validator');

var CustomerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid Email!'
        }
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
    name: {
        type:String
    }
    
  });

var Customer = mongoose.model('Customer',CustomerSchema);

module.exports = {Customer};