# tdd fastify

## Start dev
package.json
```json
{
    "scripts":{
        "dev": "tsc && concurrently -k -p \"[{name}]\" -n \"TypeScript,App\" -c \"yellow.bold,cyan.bold\" \"tsc --watch\" \"fastify start --ignore-watch=\\\".next logs .ts$\\\" -w -l info -P dist/app.js\""
    }
}
```
tsconfig.json
```json
"exclude": [
    "node_modules",
    ".next",
    "logs"
]
```

npm i config
npm i -D @types/config cross-env

create config/develop.json
create config/test.json

db-migrate up --config config/test.json -e database
db-migrate up --config config/develop.json -e database

## Reference
- [How To Setup a Typescript Fastify API with Jest Tests The Right Way!](https://www.youtube.com/watch?v=beY0sn-XgtY)
- [Setup A Fastify App with Jest Tests the Right Way](https://jaywolfe.dev/blog/setup-a-fastify-app-with-jest-tests-the-right-way/)
- [fastify-jest-example](https://github.com/wolfejw86/blog-examples/tree/master/fastify-jest-example)
- [npm run dev in typescript project, watch is not workin](https://github.com/fastify/fastify-cli/issues/246#issuecomment-915604892)
- [TypeScript / Node.js: Importing Knex into an ES6 module](https://dev.to/asteinarson/typescript-node-js-importing-knex-into-es6-module-1poc)
- [Password Salting: เค็มแต่ดี](https://blog.sethanantp.com/password-salting/)
- [ทำไมต้องใช้ bcrypt ในการ Hash Password](https://blog.sethanantp.com/why-using-bcrypt/)


