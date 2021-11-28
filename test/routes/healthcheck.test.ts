import { build } from '../helper';

describe('healthcheck test', () => {
     const app = build()

     test('should return 200 when app is healthy', async ()=>{
         const healthcheckResponse = await app.inject('/healthcheck')

         expect(healthcheckResponse.statusCode).toBe(200)
     })
})