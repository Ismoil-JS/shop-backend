import jwt from 'jsonwebtoken';

const secretKey = "ismoil";


export const SignMethod = (payload, expireTime = "1h") => {
    return jwt.sign(payload, secretKey, { expiresIn: expireTime })
}
export const VerifyMethod = (token) => jwt.verify(token, secretKey);
