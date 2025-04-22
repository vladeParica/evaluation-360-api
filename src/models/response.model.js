const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    evaluation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evaluation',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    numericalResponse: {
        type: Number,
        min: 1,
        max: 5
    },
    textResponse: {
        type: String
    },
    multipleChoiceResponse: {
        type: Number
    }
}, { timestamps: true });

const Response = mongoose.model('Response', responseSchema);
module.exports = Response;