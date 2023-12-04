const EMAIL_REGEX = /^[A-z,0-9]*@[A-z]*\.[a-z]+$/
/**
 * Checks if register data passes the requirements.
 * @param {String} name Username provided from the client. It will be used to display player in the leaderboards and such. 
 * Requirements: It has to be at least 3 characters long and not longer than 12 characters. 
 * TODO: Regex for symbols other than numbers and letters. Profanity check.
 * @param {String} email Email provided from the client. It will be used to contact the user. 
 * Requirements: It has to be at least 5 letters long and pass the regex check.
 * TODO: Profanity check.
 * @returns {Object} Returns a payload if any of the inputs don't pass requirements.
 */
export const validateRegister = (name, email) =>{
    let payload = ""
    if(name.length > 12)
        payload += "Name too long"
    else if(name.length < 3)
        payload += "Name too short"
    let isEmail = EMAIL_REGEX.test(email);
    console.log("Is email? " + isEmail);
    if(email.length < 5)
        payload += ":Email too short"
    else if(!EMAIL_REGEX.test(email))
        payload += ":Not a email"
    console.log(payload)
    return payload
}

/**
 * Builds payload suitable for client interpretation
 * @param {String} user User UUID.
 * @param {String} action Action for the clien to perform 
 * @param {String | null} payload Data required for action to be processed/performed. If !payload "none" is sent instead   
 * @returns The built payload message suitable to be sent to the client 
 */
export const buildPayload = (user, action, payload) => {
    return `{"uuid":"${user}","action":"${action}","payload":` + (payload? payload : "\"none\"") +`}`
}
