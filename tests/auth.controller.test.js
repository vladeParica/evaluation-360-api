const request = require('supertest');
const mongoose = require('mongoose');
const { createServer } = require('http');
const app = require('../src/config/app');
const User = require('../src/models/user.model');

require('dotenv').config({ path: '.env.test' });

const agent = request.agent(app);

describe('Auth Controller', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        if (agent.close) {
            agent.close();
        }
        await mongoose.connection.close();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'employee'
            };

            const response = await agent
                .post('/api/auth/register')
                .send(userData);

            expect(response.statusCode).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.data.user).toHaveProperty('id');
            expect(response.body.data.user.email).toBe(userData.email);
            expect(response.body.data.user.role).toBe(userData.role);
        });

        it('should not register a user with duplicate email', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'employee'
            };

            await User.create(userData);

            const response = await agent
                .post('/api/auth/register')
                .send({
                    ...userData,
                    username: 'testuser2'
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.status).toBe('fail');
        });
    });

    describe('POST /api/auth/login', () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            role: 'employee'
        };

        beforeEach(async () => {
            await User.create(userData);
        });

        it('should login a user with correct credentials', async () => {
            const response = await agent
                .post('/api/auth/login')
                .send({
                    email: userData.email,
                    password: userData.password
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toHaveProperty('token');
            expect(response.body.data.user.email).toBe(userData.email);
        });

        it('should not login with incorrect password', async () => {
            const response = await agent
                .post('/api/auth/login')
                .send({
                    email: userData.email,
                    password: 'wrongpassword'
                });

            expect(response.statusCode).toBe(401);
            expect(response.body.status).toBe('fail');
        });
    });
});