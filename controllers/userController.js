const User = require('../models/User');

// Helper function for validation
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// @desc    Register a user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log(`❌ User already exists: ${email}`);
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
    });

    console.log(`✅ User registered successfully: ${email}`);

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: userResponse,
    });
  } catch (error) {
    console.error(`❌ Registration error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering user',
    });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    console.log(`📋 Retrieved ${users.length} users`);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(`❌ Error fetching users: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching users',
    });
  }
};

// @desc    Get a user by ID
// @route   GET /api/users/:id
// @access  Public
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user',
    });
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    // Check if user exists
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if new email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
    }

    // Update user
    if (name) user.name = name;
    if (email) user.email = email;

    user = await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating user',
    });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting user',
    });
  }
};
