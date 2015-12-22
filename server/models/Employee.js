var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Employee = mongoose.model('Employee', new Schema({
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        role: { type: String, required: true },
        location: { type: String, ref: 'Location' }
    }));

module.exports = Employee;