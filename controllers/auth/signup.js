import bcrypt from 'bcrypt';
import { prisma } from '../../utils/prisma.js';
import jwt from 'jsonwebtoken';

const addUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({
            success: false,
            message: 'All fields are required',
        });
    }

    try {
        if (password.length < 6 || !RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).test(password)) {
            return res.send({
                success: false,
                message: 'Password must be at least 6 characters and contain both letters and numbers.',
            });
        }

        if (!email.includes('@') || !email.includes('.com')) {
            return res.send({
                success: false,
                message: 'Invalid email',
            });
        }

        const existingUser = await prisma.User.findUnique({ where: { email } });
        if (existingUser) {
            return res.send({
                success: false,
                message: 'User already exists',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.User.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
   //            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.send({
            success: true,
            message: 'User created successfully',
            user,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
};

export default {
    addUser,
};
