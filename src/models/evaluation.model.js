const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    period: {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'completed'],
        default: 'draft'
    },
    type: {
        type: String,
        enum: ['self', 'peer', 'manager', 'subordinate', 'complete360'],
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    evaluator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    questionSet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
}, { timestamps: true });

const Evaluation = mongoose.model('Evaluation', evaluationSchema);
module.exports = Evaluation;