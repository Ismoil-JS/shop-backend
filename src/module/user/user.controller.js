import { randomUUID } from "crypto"
import { SignMethod } from "../../helpers/jwt.helper.js";
import userService from "./user.service.js";

class UserController{

    async SignUp(req, res){
        const {username, password} = req.body;
        const id = randomUUID();
        const accesToken = SignMethod({id: id, time: 60});
        const refreshToken = SignMethod({id: id, time: 180});
        const user = await userService.GetUsers(username, password);

        if(user.length > 0){
            res.status(409).json({
                message: "User already exist",
            });
            return;
        }
        const data = await userService.SignUp(id, username, password, accesToken, refreshToken);
        res.status(201).json({
            accesToken,
            refreshToken
        });
    }

    async SignIn(req, res){
        const {username, password} = req.body;
        const user = userService.GetUsers(username, password);
        const accesToken = SignMethod({id: user.id, time: 60});
        const refreshToken = SignMethod({id: user.id, time: 180});

        if(user){

        await userService.SignIn(username, password, accesToken, refreshToken);
        res.status(201).json({
            accesToken,
            refreshToken
        });} else {
            res.status(404).json({
                message: "User not found",
            });
        }
    }

    async signOut(req, res) {
        const { refreshtoken } = req.headers
        const [user] = await userService.retrieveRefreshToken(refreshtoken)
    console.log(user);
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return
        }

        await userService.signOut({
            refreshToken: refreshtoken
        })

        res.sendStatus(204)
    }

    async refresh(req, res) {
        const { refreshtoken } = req.headers
        const user = await userService.retrieveRefreshToken(refreshtoken)

        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return
        }

        const serviceResponse = await userService.refresh({
            accesToken: SignMethod({id: user.id, time: 60}),
            refreshToken: SignMethod({id: user.id, time: 180}),
            oldRefreshToken: refreshtoken
        })

        res.status(200).json({
            data: serviceResponse
        })
    }

}

export default new UserController;