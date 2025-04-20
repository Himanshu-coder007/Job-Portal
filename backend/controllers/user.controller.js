import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields.",
        success: false,
      });
    }

    // Handle file upload
    const file = req.file;
    let cloudResponse = null;
    if (file) {
      const fileUri = getDataUri(file);
      try {
        cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      } catch (error) {
        return res.status(500).json({
          message: "Failed to upload profile photo to Cloudinary.",
          success: false,
          error: error.message,
        });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse ? cloudResponse.secure_url : null,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
        profile: newUser.profile,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An internal server error occurred.",
      success: false,
      error: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields.",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        message: `Welcome back, ${user.fullname}!`,
        user: userResponse,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An internal server error occurred.",
      success: false,
      error: error.message,
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An internal server error occurred.",
      success: false,
      error: error.message,
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    let cloudResponse = null;
    if (file) {
      const fileUri = getDataUri(file);
      try {
        cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      } catch (error) {
        return res.status(500).json({
          message: "Failed to upload file to Cloudinary.",
          success: false,
          error: error.message,
        });
      }
    }

    let skillsArray = null;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // Assumes middleware sets `req.id`
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An internal server error occurred.",
      success: false,
      error: error.message,
    });
  }
};
