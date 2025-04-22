require('dotenv').config();
const app = require('./config/app');
const connectDB = require('./config/database');

connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!  Cerrando servidor...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});