const mongoose = require('mongoose');

var addressSchema = mongoose.Schema({
    address :{
        type: String,
        required: true
    },
    Customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

var Address = mongoose.model('Address',addressSchema);

module.exports = {Address}; 