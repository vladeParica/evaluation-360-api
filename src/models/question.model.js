const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['leadership', 'communication', 'teamwork', 'technical', 'productivity'],
        required: true
    },
    type: {
        type: String,
        enum: ['scale', 'text', 'multiple_choice'],
        default: 'scale'
    },
    options: [{
        value: Number,
        text: String
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;