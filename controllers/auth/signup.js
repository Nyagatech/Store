import bcrypt from 'bcrypt';
import { prisma } from '../../utils/prisma.js';
import jwt from 'jsonwebtoken';

const addUser = async (req, res) => {
    // getting the email and password from the request body by destructuring the body
    const { email, password } = req.body;
// checking if all fields are present
    if (!email || !password) {
        return res.send({
            success: false,
            message: 'All fields are required',
        });
    }

    try {
        // checking if the password is valid
        if (password.length < 6 || !RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).test(password)) {
            return res.send({
                success: false,
                message: 'Password must be at least 6 characters and contain both letters and numbers.',
            });
        }
// checking if the email is valid
        if (!email.includes('@') || !email.includes('.com')) {
            return res.send({
                success: false,
                message: 'Invalid email',
            });
        }
// checking if the user already exists
        const existingUser = await prisma.User.findUnique({ where: { email } });
        if (existingUser) {
            return res.send({
                success: false,
                message: 'User already exists',
            });
        }
// hashing the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
// creating the user in the database using the hashed password and the email
        const user = await prisma.User.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
// setting the token for the user baased on the userId
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//Setting the cookie to the response object so that it can be sent to the client for clients authentication
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            samesite: none,
        });
// sending the response with the user object and success message if all the steps are successful
        return res.send({
            success: true,
            message: 'User created successfully',
            user,
        });

    } catch (error) {
        // handling the error if any
        console.error(error);// logging the error to the console
        return res.status(500).send({// sending the response with the error message if any error occurs
            success: false,
            message: 'Internal server error',
        });
    }
};

export default {
    addUser,
};
