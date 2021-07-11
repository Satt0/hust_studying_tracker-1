const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    subjectCode: {
        type: String,
        required: true,
    }
},{collection: "Subject"})

module.exports = mongoose.model("Subject",subjectSchema);