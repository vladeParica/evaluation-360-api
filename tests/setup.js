const mongoose = require('mongoose');
const { createServer } = require('http');
const app = require('../src/config/app');
require('dotenv').config({ path: '.env.test' });

let server;

beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI_TEST, {
            authSource: 'admin'
        });
        console.log('MongoDB connected for tests');
        server = createServer(app);
        server.listen(0);
        console.log('Test server started');
    } catch (error) {
        console.error('Error in test setup:', error);
        throw error;
    }
}, 15000);

afterAll(async () => {
    try {
        if (server) {
            await new Promise((resolve) => {
                server.close(resolve);
                console.log('Test server closed');
            });
        }
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error closing test connections:', error);
    }
}, 15000);