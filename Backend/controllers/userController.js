import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //checks email id exists or not
    const exists = await userModel.findOne({ email });
    if (!exists) {
      return res.json({ success: false, message: "User Does not Exists " });
    }

    const isMatch = await bcrypt.compare(password, exists.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = createToken(exists._id);
    res.json({
      success: true,
      token,
      user: {
        _id: exists._id,
        name: exists.name,
        email: exists.email,
      },
    });
  } catch (error) {
    res.json({ success: false, message: "Something Went Wrong" });
  }
};

//create a token using function

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //checking user is already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a Valid Email Address",
      });
    }

    //validate a password
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please Enter a Strong Password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id, user.role);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Error Occur" });
  }
};

export { loginUser, registerUser };
