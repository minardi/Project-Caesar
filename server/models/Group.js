var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

Group = mongoose.model('Group', new Schema({
    name: { type: String, required: true },
    locationCity: { type: String, required: true },
    startDate: {type: Date, default: Date.now},
    finishDate: {type: Date, default: ''},
    status: { type: String, required: true },
    teacher: {type: Array },
    experts: {type: Array },
    students: {type: Array }
}));

module.exports = Group;
