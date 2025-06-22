const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Register endpoint
const register = async (req, res) => {
  // Validate message to ensure that name, email and password are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  try {
    // Create new user object
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res
        .status(400)
        .json({ "message": "Invalid email format" });
    }

    // Create new user object
    const user = new User({
      name: req.body.name.trim(),
      email: req.body.email.trim().toLowerCase(),
      hash: '',
      salt: ''
    });
    // Set password using our schema method
    user.setPassword(req.body.password);

    // Save user to database
    const savedUser = await user.save();

    if (!savedUser) {
      return res
        .status(400)
        .json({ "message": "Failed to create user" });
    }

    // Generate JWT and return success
    const token = savedUser.generateJWT();
    return res
      .status(200)
      .json({ token });

  } catch (err) {
    return res
      .status(500)
      .json({ "message": "Database error", "error": err.message });
  }
};

// Login endpoint
const login = (req, res) => {
  // Validate message to ensure that email and password are present
    if (err) {
      // Error in Authentication Process
      return res
        .status(500)
        .json(err);
    }  // Delegate authentication to passport module
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Error in Authentication Process
      return res
        .status(404)
        .json(err);
    }

    if (user) {
      // Auth succeeded - generate JWT and return to caller
      const token = user.generateJWT();
      res
        .status(200)
        .json({ token });
    } else {
      // Auth failed return error
      res
        .status(401)
        .json(info);
    }
  })(req, res);
};

// Export methods that drive endpoints
module.exports = {
  register,
  login
};