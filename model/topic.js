const mongoose = require('mongoose');

mongoose.Schema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },

    
})
const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;