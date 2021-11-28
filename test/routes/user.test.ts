import { build } from '../helper'
import db from '../../src/config/database'

beforeEach(async () => {
    await db('users').truncate()
  });

describe('user tests', () => {
    const app = build();

    it('returns 200 ok when signup request is valid', async () => {
        const res = await app.inject({
            url: '/api/users',
            method: 'post',
            payload: {
                "first_name": "Leenawat",
                "last_name": "Papahom",
                "username": "leenawat",
                "password": "123456"
            }
        })
        expect(res.statusCode).toBe(200)
    })

    it('returns success message when signup request is valid', async () => {
        const res = await app.inject({
            url: '/api/users',
            method: 'post',
            payload: {
                "first_name": "Leenawat",
                "last_name": "Papahom",
                "username": "leenawat",
                "password": "123456"
            }
        })
        expect(res.payload).toBe('User created');
    });

    it('save the user to database', async () => {
        await app.inject({
            url: '/api/users',
            method: 'post',
            payload: {
                "first_name": "Leenawat",
                "last_name": "Papahom",
                "username": "leenawat",
                "password": "123456"
            }
        })
        const userList = await db('users').select()
        expect(userList.length).toBe(1);
    });

})