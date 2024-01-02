import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../env.js';

export const generateEncryptedPassword=async(password)=>{
    return await bcrypt.hash(password,env.SALT_ROUND)
}

export const validateThePassword= async (enteredPassword,savedPassword) => {
    return await bcrypt.compare(enteredPassword, savedPassword)
};

export const generateAccessToken = function (user) {
    return jwt.sign(
        {
            user_id: user._id,
            email: user.email,
            role: user.role,
            iat: Date.now() / 1000
        },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: env.ACCESS_TOKEN_TTL }
    );
};

export const generateRefreshToken = function (user) {
    return jwt.sign(
        {
            user_id: user._id,
        },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: env.REFRESH_TOKEN_TTL }
    );
};
export const generateAccessAndRefreshTokens = async (user) => {

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return { accessToken, refreshToken };
    
};