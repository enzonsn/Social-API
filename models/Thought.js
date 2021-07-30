const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        arguments: [1, 280],
        validator: 'isLength',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: { type: String, required: true },
    reactions: [reaction]
},{ toJSON: {virtuals: true, getters: true}, id: false });

thoughtSchema.virtual('reactionCount').get(function(){ return this.reactions.length;});
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;