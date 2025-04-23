const BaseRepository = require('./base.repository');
const Question = require('../models/question.model');

class QuestionRepository extends BaseRepository {
    constructor() {
        super(Question);
    }

    async findByCategory(category) {
        return await this.model.find({ category, isActive: true });
    }

}

module.exports = new QuestionRepository();