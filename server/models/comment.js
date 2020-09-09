const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    commentedBy:  {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})


module.exports = mongoose.model('comment', commentSchema)
