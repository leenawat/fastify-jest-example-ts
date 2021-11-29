
import { Knex } from 'knex'
// ต้องใช้ Knex ตัวใหญ๋
// https://github.com/knex/knex/blob/master/UPGRADING.md

export default class UserModel {
    db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    async select() {
        return await this.db('users').select()
    }

    async save(data: any) {
        return await this.db('users').insert(data)
    }

    async findByUsername(username: any) {
        return await this.db('users').select().where({ username }).first()
    }
}
