const BaseRepository = require('./base.repository');
const Evaluation = require('../models/evaluation.model');

class EvaluationRepository extends BaseRepository {
    constructor() {
        super(Evaluation);
    }

    async findByEmployee(employeeId) {
        return await this.model.find({ employee: employeeId });
    }

    async findByEvaluator(evaluatorId) {
        return await this.model.find({ evaluator: evaluatorId });
    }

    async findPending() {
        return await this.model.find({
            status: 'active',
            completed: false
        });
    }

    async findWithDetails(id) {
        return await this.model.findById(id)
            .populate('employee')
            .populate('evaluator')
            .populate('questionSet');
    }
}

module.exports = new EvaluationRepository();