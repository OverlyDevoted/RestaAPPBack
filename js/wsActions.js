import { validateRegister, buildPayload } from './stringUtils.js';
import { send } from './wsUtils.js';
import { nanoid } from 'nanoid';

export class WsActions {

    constructor(ws) {
        this.ws = ws;
    }

    async error(err) {
        console.error("Bad request was attempted");
        await send(this.ws, "{\"action\":\"error\", \"message\":\"" + err + "\"}")
    }
    catchErr = async (func, arg, err) => {
        console.time("Action took ")
        try {
            await func(arg);
        }
        catch (error) {
            console.error("Unforseen error occured. Notifying user..." + error)
            try {
                await this.error(err ? err : "Error while processing your request.");
            }
            catch (error) {
                console.error("Could not notify user: " + error);
            }
        }
        console.timeEnd("Action took ")
    }

    /**
     * This function establishes a new connection for a new or existing client. Existing clients are checked against the database, if validated, registered or establish action and UUID are sent to the client
     * @param {String} uuid Existing user UUID 
     * @returns End user UUID
     */
    async establish(uuid) {
        //this is ugly, as I have to write this to every function, I would like to not have to write this
        //potentially it could be implemented with a nomad
        await this.catchErr(async (uuid) => {
            let user = uuid ? uuid : nanoid();
            let isRegistered = false;
            console.log(uuid ? "Got user with UUID: " + uuid : "New user. Sending " + user + " UUID");
            if (uuid) {
                console.log("Check existing user")
            }
            send(this.ws, buildPayload(user, isRegistered ? "registered" : "establish"));
            return user;
        }, uuid, "Could not establish user")
    }
    async register(data) {
        await this.catchErr(async (data) => {
            const { uuid, username, email } = data;
            console.log(`User data. Username: ${username} , Email: ${email}`)
            //data validation here
            const payload = validateRegister(username, email)
            let action = "registered"
            if (payload)
                action = "error"
            send(this.ws, buildPayload(uuid, action, JSON.stringify(payload)));
        }, data, "Could not register user");
    }
}

