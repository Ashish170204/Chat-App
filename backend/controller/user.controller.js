import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async(req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await new User({
      name,
      email,
      password:hashedPassword,
    });
    await newUser.save();
    if(newUser){
      createTokenAndSaveCookie(newUser._id,res);
      res.status(201).json({message: "User created successfully",newUser});
    }
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};    


export const login = async(req, res)=>{
  try {
    const { email, password } = req.body;
    const user= await User.findOne({email});
    const isMatch=await bcrypt.compare(password,user.password); 
     if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid user and password" });
    }
    createTokenAndSaveCookie(user._id,res);
    res.json({message:"user logged in successfully", 
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {   //allUsers
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
    }
   catch (error) {
    console.log("Error in allUsers Controller: " + error);
    res.status(500).json({message: "server error"});
  }
};

