import {UserModel} from "./user.model.js"
import {SignMethod} from "../../helpers/jwt.helper.js"

class UserService{
#userModel;

    constructor(){
        this.#userModel = new UserModel();
    }


    async SignUp(id, username, password, accesToken, refreshToken){
        const data = await this.#userModel.SignUp(id, username, password, accesToken, refreshToken);
        return data;
    }

    async SignIn(username, password, accesToken, refreshToken){
        const data = await this.#userModel.SignIn(username, password, accesToken, refreshToken);
        return data;
    }

    async signOut(user) {
            await this.#userModel.updateRefreshToken({
                refreshToken: user.refreshToken
            });
        return
    }

    async refresh({accessToken, refreshToken, oldRefreshToken}) {

        await this.#userModel.refresh(
            refreshToken,
            accessToken,
            oldRefreshToken
        )

        return {
            accessToken,
            refreshToken
        }
    }

    async retrieveRefreshToken( refreshToken ) {
        const data = await this.#userModel.retrieveRefreshToken(refreshToken)
        return data
    }

    async GetUsers(username, password){
        const data = await this.#userModel.GetUsers(username, password);
        return data;
    }
}

export default new UserService;