const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/config/app');
const User = require('../src/models/user.model');
const Employee = require('../src/models/employee.model');
const authService = require('../src/services/auth.service');

require('dotenv').config({ path: '.env.test' });

const agent = request.agent(app);

describe('Employee Controller', () => {
    let adminToken;
    let employeeToken;
    let adminUser;
    let employeeUser;
    let testEmployee;

    beforeAll(async () => {
        try {
            adminUser = await User.create({
                username: 'adminuser',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin'
            });

            employeeUser = await User.create({
                username: 'employeeuser',
                email: 'employee@example.com',
                password: 'password123',
                role: 'employee'
            });

            adminToken = authService.generateToken(adminUser);
            employeeToken = authService.generateToken(employeeUser);
        } catch (error) {
            console.error('Error in beforeAll:', error);
            throw error;
        }
    });

    beforeEach(async () => {
        await Employee.deleteMany({});
    });

    afterAll(async () => {
        if (agent.close) {
            agent.close();
        }
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/employees', () => {
        it('should create a new employee when admin is authenticated', async () => {
            const employeeData = {
                userId: employeeUser._id,
                firstName: 'John',
                lastName: 'Doe',
                position: 'Developer',
                department: 'Engineering',
                hireDate: new Date()
            };

            const response = await agent
                .post('/api/employees')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(employeeData);

            expect(response.statusCode).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.data.employee).toHaveProperty('_id');
            expect(response.body.data.employee.firstName).toBe(employeeData.firstName);
            expect(response.body.data.employee.lastName).toBe(employeeData.lastName);
            expect(response.body.data.employee.position).toBe(employeeData.position);
            expect(response.body.data.employee.department).toBe(employeeData.department);
            expect(response.body.data.employee.userId).toBe(employeeData.userId.toString());
        });

        it('should not allow non-admin to create employee', async () => {
            const employeeData = {
                userId: employeeUser._id,
                firstName: 'John',
                lastName: 'Doe',
                position: 'Developer',
                department: 'Engineering',
                hireDate: new Date()
            };

            const response = await agent
                .post('/api/employees')
                .set('Authorization', `Bearer ${employeeToken}`)
                .send(employeeData);

            expect(response.statusCode).toBe(403);
            expect(response.body.status).toBe('fail');
        });
    });

    describe('GET /api/employees', () => {
        let employeesData;

        beforeEach(async () => {
            employeesData = [
                {
                    userId: adminUser._id,
                    firstName: 'Admin',
                    lastName: 'User',
                    position: 'Manager',
                    department: 'Management',
                    hireDate: new Date()
                },
                {
                    userId: employeeUser._id,
                    firstName: 'John',
                    lastName: 'Doe',
                    position: 'Developer',
                    department: 'Engineering',
                    hireDate: new Date()
                }
            ];

            await Employee.create(employeesData);
        });

        it('should get all employees when admin is authenticated', async () => {
            const response = await agent
                .get('/api/employees')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');
            
            employeesData.forEach((employee) => {
                const foundEmployee = response.body.data.employees.find(
                    emp => emp.userId === employee.userId.toString()
                );
                expect(foundEmployee).toBeDefined();
                expect(foundEmployee.firstName).toBe(employee.firstName);
                expect(foundEmployee.lastName).toBe(employee.lastName);
                expect(foundEmployee.position).toBe(employee.position);
                expect(foundEmployee.department).toBe(employee.department);
            });
        });

        it('should not allow regular employee to get all employees', async () => {
            const response = await agent
                .get('/api/employees')
                .set('Authorization', `Bearer ${employeeToken}`);

            expect(response.statusCode).toBe(403);
            expect(response.body.status).toBe('fail');
        });
    });

    describe('GET /api/employees/:id', () => {
        beforeEach(async () => {
            testEmployee = await Employee.create({
                userId: employeeUser._id,
                firstName: 'Test',
                lastName: 'Employee',
                position: 'Tester',
                department: 'QA',
                hireDate: new Date()
            });
        });

        it('should get employee by id when admin is authenticated', async () => {
            const response = await agent
                .get(`/api/employees/${testEmployee._id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.employee._id).toBe(testEmployee._id.toString());
            expect(response.body.data.employee.firstName).toBe(testEmployee.firstName);
            expect(response.body.data.employee.lastName).toBe(testEmployee.lastName);
        });

        it('should not allow regular employee to get employee by id', async () => {
            const response = await agent
                .get(`/api/employees/${testEmployee._id}`)
                .set('Authorization', `Bearer ${employeeToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');
        });

        it('should return 404 for non-existent employee', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const response = await agent
                .get(`/api/employees/${nonExistentId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body.status).toBe('fail');
        });
    });

    describe('PUT /api/employees/:id', () => {
        beforeEach(async () => {
            testEmployee = await Employee.create({
                userId: employeeUser._id,
                firstName: 'Test',
                lastName: 'Employee',
                position: 'Tester',
                department: 'QA',
                hireDate: new Date()
            });
        });

        it('should update employee when admin is authenticated', async () => {
            const updateData = {
                firstName: 'Updated',
                lastName: 'Name',
                position: 'Senior Developer',
                department: 'Engineering',
                hireDate: new Date()
            };

            const response = await agent
                .put(`/api/employees/${testEmployee._id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updateData);

            expect(response.statusCode).toBe(400);
            expect(response.body.status).toBe('fail');
        });

        it('should not allow regular employee to update employee', async () => {
            const updateData = {
                firstName: 'Updated',
                lastName: 'Name',
                hireDate: new Date()
            };

            const response = await agent
                .put(`/api/employees/${testEmployee._id}`)
                .set('Authorization', `Bearer ${employeeToken}`)
                .send(updateData);

            expect(response.statusCode).toBe(403);
            expect(response.body.status).toBe('fail');
        });

        it('should return 404 for non-existent employee', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const updateData = {
                firstName: 'Updated',
                lastName: 'Name',
                hireDate: new Date()
            };

            const response = await agent
                .put(`/api/employees/${nonExistentId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updateData);

            expect(response.statusCode).toBe(400);
            expect(response.body.status).toBe('fail');
        });
    });
});