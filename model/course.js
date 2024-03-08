const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true

    },
    category: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    chapter: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
    }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;