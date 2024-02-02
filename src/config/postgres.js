import pg from "pg"

export class Postgres{
    #pg;

    constructor(){
        this.#pg = new pg.Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: '1234',
            database: 'postgres',
        });
    }

    async fetch(SQL, ...params){
        const client = await this.#pg.connect();
        try{
            const {rows} = await client.query(SQL, params.length ? params : null);
            return rows;
        }catch(e){
            console.log(e);
        }finally{
            client.release();
        }
    }
}