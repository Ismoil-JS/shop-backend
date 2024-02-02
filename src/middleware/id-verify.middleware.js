import jwt from "jsonwebtoken";
import { Postgres } from "../config/postgres.js";

const model = new Postgres();
const secretKey = "ismoil";

const VerifyAccessMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    const accesstoken = authorization?.split(" ")[2];


    if (!accesstoken) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    jwt.verify(accesstoken, secretKey, async (err, decoded) => {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                message: "Token expired"
            });
            return;
        }

        if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                message: "Invalid token"
            });
            return;
        }

        const [user] = await model.fetch(`select * from users where accesstoken = $1`, accesstoken);

        if (!user) {
            res.status(401).json({
                message: "Invalid token to use"
            });
            return;
        }

        req.body.id = user.id;
        next();
    });
};

export default VerifyAccessMiddleware; // Don't invoke the function here
