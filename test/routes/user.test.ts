import { build } from '../helper'
import db from '../../src/config/database'

const app = build()

const validUser = {
    'first_name': 'Leenawat',
    'last_name': 'Papahom',
    'username': 'leenawat',
    'password': '123456'
}

const postUser = () => {
    return app.inject({
        url: '/api/users',
        method: 'post',
        payload: validUser
    })
}

const postUser2 = () => {
    const payload = {...validUser}
    payload.username = 'leenawat2'
    return app.inject({
        url: '/api/users',
        method: 'post',
        payload
    })
}

describe('user tests', () => {
    
    beforeEach(async () => {
        await db('users').truncate()
    })
    
    it('returns 200 ok when signup request is valid', async () => {
        const res = await postUser()
        expect(res.statusCode).toBe(200)
    })

    it('returns success message when signup request is valid', async () => {
        const res = await postUser()
        expect(res.payload).toBe('User created')
    })

    it('save the user to database', async () => {
        // await db('users').truncate()
        let userList = await db('users').select()
        expect(userList.length).toBe(0)
        await postUser()
        userList = await db('users').select()
        expect(userList.length).toBe(1)
    })

    it('password ที่เก็บใน database ต้องไม่เป็น plaintext', async () => {
        await postUser()
        const user = await db('users').first()
        expect(user.password).not.toBe(validUser.password)
    })

    it('user 2 คนที่มี password เหมือนกัน จะต้องถูกเก็บโดยเข้ารหัสแล้วต้องไม่เหมือนกัน', async () => {
        await postUser()
        await postUser2()
        const userList = await db('users').select()
        expect(userList[0].password).not.toBe(userList[1].password)
        await db('users').truncate()
    })
})