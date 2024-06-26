import express from 'express';
import http from 'http'
import { start } from './app.js'
import env from './env.js';

const StartServer = async () => {
    const app = express();
    const server = http.createServer(app);
    await start(app)
    server.listen(env.PORT, () => {
        console.log("⚙️  Application is running on port : " + env.PORT);
    }).on('error', (err) => {
        console.log(err)
        process.exit(1)
    })
}
StartServer()
