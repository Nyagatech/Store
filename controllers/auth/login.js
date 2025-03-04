import { prisma } from "../../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginUser = async (req, res) => {
  //getting the body the user entered through destructuring the requets
  const { email, password } = req.body;
  //checking if all fields are present
  if (!email || !password) {
    return res.send({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    //checking if the password is at least 6 characters long and contains both letters and numbers
    if (
      password.length < 6 ||
      !RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).test(password)
    ) {
      return res.send({
        success: false,
        message:
          "Password must be at least 6 characters and contain both letters and numbers.",
      });
    }
    //checking if the email is valid
    if (!email.includes("@") || !email.includes(".com")) {
      return res.send({
        success: false,
        message: "Invalid email",
      });
    }
    //checking if the email exists in the database
    const user = await prisma.User.findUnique({
      where: {
        email,
      },
    });
    //validatimg the user
    if (!user) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //checking if the hashed password matches the password entered by the user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${3600 * 24 * 7}`);
    // we are using the user id to denerate the token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    //Logging in the user and sending success response if all the error validations pass
    res.send({
      success: true,
      message: "User Logged In Successfully",
    });
  } catch (error) {
    // Handle the error
    console.error(error);
    res.status(500).send({
      // Send Internal Server Error response
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default {
  loginUser,
};
