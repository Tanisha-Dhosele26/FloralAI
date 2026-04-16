// signup

const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    console.log("Before db query");

    // check if user already exists
    const existingUser = await User.findOne({ email });

    console.log("After db query");

    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password hashed"); 

    // create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Saving user");
    await user.save();

    console.log("User saved");

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


// login

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request:", req.body);

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login successful");

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
