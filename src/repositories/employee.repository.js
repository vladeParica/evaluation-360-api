const BaseRepository = require('./base.repository');
const Employee = require('../models/employee.model');

class EmployeeRepository extends BaseRepository {
    constructor() {
        super(Employee);
    }

    async findByUserId(userId) {
        return await this.model.findOne({ userId });
    }

    async findByDepartment(department) {
        return await this.model.find({ department });
    }

    async findWithUser(id) {
        return await this.model.findById(id).populate('userId');
    }
}

module.exports = new EmployeeRepository();