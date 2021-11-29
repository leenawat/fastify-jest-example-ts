
import { Knex } from 'knex'
// ต้องใช้ Knex ตัวใหญ๋
// https://github.com/knex/knex/blob/master/UPGRADING.md

export class userModel {
    async select(db: Knex) {
        return await db('users').select()
    }
    async save(db: Knex, data: any) {
        return  await db('users').insert(data)
    }
    async findByUsername(db: Knex, username: any) {
        return  await db('users').select().where({username}).first()
    }
}
