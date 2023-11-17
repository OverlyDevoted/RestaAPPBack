const { validateRegister, buildPayload } = require('./stringUtils');
const { send } = require('./wsUtils');
const { nanoid } = require('nanoid')
const Redis = require('redis')


class WsActions {
    static redisClient = Redis.createClient({
        host:'redis-server',
        port:6379
      });
    constructor(ws) {
        this.ws = ws;
    }

    static async connectRedis()
    {
        await WsActions.redisClient.connect();
        console.log("established redis");
    }
    establish = async (uuid) => {
        let user = uuid ? uuid : nanoid();
        let isRegistered = false;
        console.log(uuid? "Got user with UUID: " + uuid : "New user. Sending " + user + " UUID");
        if (uuid) {
            console.log("Check existing user")
            await WsActions.redisClient.set(uuid, "Gay");
        }
        send(this.ws, buildPayload(user, isRegistered ? "registered" : "establish"));
        
        return user;
    }

    register = (uuid, username, email) => {
        console.log(`User data. Username: ${username} , Email: ${email}`)
        //data validation here
        const payload = validateRegister(username, email)
        let action = "registered"
        if (payload)
            action = "failed"
        send(this.ws, buildPayload(uuid, action, JSON.stringify(payload)));
    }
}

module.exports = {WsActions}