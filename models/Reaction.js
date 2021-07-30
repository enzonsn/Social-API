const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    reactionID: { type: Types.ObjectId, default: new Types.ObjectId() },
    reactionBody: { type: String, maxLength: 280, required: true},
    username: { type: String, required: true },
    createdAt: { 
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
}, { toJSON: { getters: true }, id: false });

module.exports = reactionSchema;