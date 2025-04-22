const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/appError');

class AuthService {
    async register(userData) {
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new AppError('El correo electrónico ya está registrado', 400);
        }

        return await userRepository.create(userData);
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);

        if (!user || !(await user.comparePassword(password))) {
            throw new AppError('Correo electrónico o contraseña incorrectos', 401);
        }

        const token = this.generateToken(user);

        return {
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            token
        };
    }

    generateToken(user) {
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
    }
}

module.exports = new AuthService();