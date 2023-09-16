import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import Jwt from 'jsonwebtoken';

// @desc - Auth user and get token
// @route - POST /api/users/login
// @access - Public
const authUser = asyncHandler(async (req, res) => {
    // We need to pass in the body of request the email and password
    const { email, password } = req.body;
    const user = User.findOne({ email });

    if(user && (await user.matchPassword(password))) {

        // JWT Code
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        // Set JWT as HTTP-Only
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30d
        });

        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        req.status(401); // UnAuthorized user
        throw new Error('Invalid Email or Password');
    }

});

// @desc - Register user
// @route - POST /api/users
// @access - Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('Register user');
});

// @desc - Logout user / Clear Cookie
// @route - POST /api/users/logout
// @access - Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        message: 'Logged out successfully'
    });
});

// @desc - User profile
// @route - GET /api/users/profile
// @access - Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('Profile  user');
});


// @desc - Update ser profile
// @route - PUT /api/users/profile
// @access - Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('Profile update');
});

// @desc - Get Users
// @route - GET /api/users
// @access - Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('Get users');
});

// @desc - Get User by Id
// @route - GET /api/users/:id
// @access - Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('Get user');
});

// @desc - Delete User
// @route - DELETE /api/users/:id
// @access - Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Delete user');
});

// @desc - Update User
// @route - PUT /api/users/:id
// @access - Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('Update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
};