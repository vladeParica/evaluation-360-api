const BaseRepository = require('./base.repository');
const Response = require('../models/response.model');

class ResponseRepository extends BaseRepository {
    constructor() {
        super(Response);
    }

    async findByEvaluation(evaluationId) {
        return await this.model.find({ evaluation: evaluationId })
            .populate('question');
    }

    async createMany(responses) {
        return await this.model.insertMany(responses);
    }
}

module.exports = new ResponseRepository();