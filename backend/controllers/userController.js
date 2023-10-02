import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateTokens.js';

// @desc - Auth user and get token
// @route - POST /api/users/login
// @access - Public
const authUser = asyncHandler(async (req, res) => {
    // We need to pass in the body of request the email and password
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))) {
        // JWT Code
        generateToken(res, user._id);     
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401); // UnAuthorized user
        throw new Error('Invalid Email or Password');
    }

});

// @desc - Register user
// @route - POST /api/users
// @access - Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        // JWT Code
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
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
    const user = await User.findById(req.user._id);

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc - Update ser profile
// @route - PUT /api/users/profile
// @access - Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
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