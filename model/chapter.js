const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topic : [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Topic'  
    }],
  course : [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Course'  
    }]
})
const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;

