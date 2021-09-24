const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    boardName: { type: String, required: true },
    boardCode: { type: String },
    total: { type: Number, minlength: 7 },
    type: { type: String },
    limit: { type: Number, minlength: 7},
    tools: [{
        tool: { type: Schema.Types.ObjectId, ref: "Tool" },
        total: { type: Number, default: 0 }
    }],
    avartar: { url: {type: String}, public_id: {type: String} },
    images: [{ url: {type: String}, public_id: {type: String} }],
    description: { type: String },
    isAlert: {type: Boolean, default: false}
});

module.exports = mongoose.model('Board', boardSchema);

// 3330101109921