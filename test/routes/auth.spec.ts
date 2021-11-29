import { build } from '../helper'
import db from '../../src/config/database'
import bcrypt from 'bcryptjs';
import { Knex } from 'knex';

const app = build();

beforeEach(async () => {
    await db('users').truncate()
});

const activeUser = { username: 'user1', password: 'P4ssword', first_name: "User1", last_name: "LastName1" };

const credentials = { username: 'user1', password: 'P4ssword' };


const addUser = async (user = { ...activeUser }) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return await db('users').insert(user)
};

const postAuthentication = async (credentials: any, options = {}) => {
    return await app.inject({
        url: '/api/auth/sign-in',
        method: 'post',
        payload: credentials
    })
};


describe('Authentication', () => {
    it('returns 200 when credentials are correct', async () => {
        await addUser();
        const res = await postAuthentication(credentials);
        expect(res.statusCode).toBe(200);
    });

    it('returns 401 ถ้า password ไม่ถูกต้อง', async () => {
        await addUser();
        const res = await postAuthentication({ username: 'user1', password: 'Invalidpassword' });
        expect(res.statusCode).toBe(401);
    });
})