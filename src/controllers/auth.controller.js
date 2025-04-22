const authService = require('../services/auth.service');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res) => {
    const user = await authService.register(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        }
    });
});

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
        status: 'success',
        data: result
    });
});