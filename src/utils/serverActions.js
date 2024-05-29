export class ServerActions {
    // Receive codes are from 100-499
    static receive = {
        establish:"establish",
        register:"register"
    }
    // Send codes are from 500-999
    static send = {
        establish:"establish",
        registered:"registered",
        error:"error"
    }
}