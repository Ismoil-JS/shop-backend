import {Postgres} from "../../config/postgres.js";

export class OrderModel {
#postgres;
    constructor() {
        this.#postgres = new Postgres();
    }

    async createOrder(userId, productId) {
        const query = `INSERT INTO orders(userid, productid) VALUES ($1, $2)`;
        return await this.#postgres.fetch(query, userId, productId);
    }
}