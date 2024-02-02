import {Postgres} from "../../config/postgres.js"

export class UserModel{
 #postgres;

    constructor(){
        this.#postgres = new Postgres();
    }

    async SignUp(id, username, password, accesToken, refreshToken){
        const query = `INSERT INTO users (id, username, password, accessToken, refreshToken) VALUES ($1, $2, crypt($3, gen_salt('bf', 4)), $4, $5) RETURNING id`;
        const data = await this.#postgres.fetch(query, id, username, password, accesToken, refreshToken);
        return data;
    }

    async SignIn(username, password, accesToken, refreshToken){
        const query = `UPDATE users
        SET accessToken = $1, refreshToken = $2
        WHERE username = $3 AND password = crypt($4, password);
        `;
        const data = await this.#postgres.fetch(query, accesToken, refreshToken, username, password);
        return data;
    }

    async retrieveRefreshToken( refreshToken ) {
        const query = `SELECT * FROM users WHERE refreshToken = $1 and deleted_at IS NULL`;
        const data = await this.#postgres.fetch(query, refreshToken)
        return data
    }

    async updateRefreshToken( {refreshToken} ) {
        await this.#postgres.fetch(`
        UPDATE 
            users
        SET
            deleted_at = CURRENT_TIMESTAMP
        WHERE
            refreshToken = $1        
        `, refreshToken)
    }

    async refresh(accessToken, refreshToken, oldRefreshToken) {
        const query = `
        UPDATE 
            users
        SET
            accessToken = $1,
            refreshToken = $2
        WHERE
            refreshToken = $3`
        await this.#postgres.fetch(query, accessToken, refreshToken, oldRefreshToken)
    }

    async GetUsers(username, password){
        const query = `SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)`;
        const data = await this.#postgres.fetch(query, username, password);
        return data;
    }
    
}