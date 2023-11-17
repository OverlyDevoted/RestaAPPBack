const { validateRegister, buildPayload } = require('./stringUtils');
const { send } = require('./wsUtils');
const { nanoid } = require('nanoid')


class WsActions {

    constructor(ws){
        this.ws = ws;
    }
    establish = (uuid) => {
        let user = uuid ? uuid : nanoid();
        let isRegistered = false;
        console.log("User uuid: " + uuid);
        if (uuid) {
            console.log("Check existing user")
            // get from data base and instantiate object and if the user already has 
            // name and email setup send that as a payload and change the action to registered   
            isRegistered = connections.hasOwnProperty(user)
            if (!isRegistered)
                connections[user] = {}
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