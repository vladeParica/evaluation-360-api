const employeeRepository = require('../repositories/employee.repository');
const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/appError');

class EmployeeService {
    async getAllEmployees() {
        return await employeeRepository.findAll();
    }

    async getEmployeeById(id) {
        const employee = await employeeRepository.findWithUser(id);
        if (!employee) {
            throw new AppError('Empleado no encontrado', 404);
        }
        return employee;
    }

    async createEmployee(employeeData) {
        const user = await userRepository.findById(employeeData.userId);
        if (!user) {
            throw new AppError('Usuario no encontrado', 404);
        }

        const existingEmployee = await employeeRepository.findByUserId(employeeData.userId);
        if (existingEmployee) {
            throw new AppError('Ya existe un empleado para este usuario', 400);
        }

        return await employeeRepository.create(employeeData);
    }

    async updateEmployee(id, employeeData) {
        const employee = await employeeRepository.findById(id);
        if (!employee) {
            throw new AppError('Empleado no encontrado', 404);
        }

        return await employeeRepository.update(id, employeeData);
    }
}

module.exports = new EmployeeService();