const userSchema = require("../model/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("dotenv").config();

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await userSchema.findOne({ email });
    if(!user){
        return res.json({ message: "User not found", status: 400});
    }else{
        const passwordMatcher = await bcrypt.compare(password, user.password);
        if(passwordMatcher){
            const token = jwt.sign({email: user.email ,userId : user.id ,},process.env.JWT_SECRET,{expiresIn:'1h'});
            return res.json({ token : token ,status : 200 })
        }else{
            return res.json({ status : 400 , message : "Password is incorrect"})
        }
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error", status: 500 });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      console.log("user already existed");
      return res.json({ message: "User already exists", status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userSchema.create({
      email,
      password: hashedPassword,
    });
    console.log("new user created: ", newUser);
    const token = jwt.sign({email: user.email ,userId : user.id ,},process.env.JWT_SECRET,{expiresIn:'1h'});

    res.json({ message: "User created successfully", status: 201 , token : token});
  } catch (error) {
    console.error("Error during signup:", error);
    res.json({ error: "Internal server error", status: 500 });
  }
};

module.exports = {
  signin,
  signup,
};
