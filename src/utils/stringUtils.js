const profanityFilter = require("./profanityFilter.js");

const EMAIL_REGEX = /^[A-z,0-9]*@[A-z]*\.[a-z]+$/;
const STRING_REGEX = /^[A-z,0-9]{4,20}$/;
/**
 * Checks if register data passes the requirements.
 * @param {String} username Username provided from the client. It will be used to display player in the leaderboards and such.
 * Requirements: It has to be at least 3 characters long and not longer than 12 characters.
 * TODO: Regex for symbols other than numbers and letters. Profanity check.
 * @param {String} email Email provided from the client. It will be used to contact the user.
 * Requirements: It has to be at least 5 letters long and pass the regex check.
 * TODO: Profanity check.
 * @returns {Object} Returns a payload if any of the inputs don't pass requirements.
 */
module.exports.validateRegister = (username, email) => {
  let payload = "";
  if (username.length > 20) payload += "Name too long";
  else if (username.length < 3) payload += "Name too short";
  else if (!STRING_REGEX.test(username))
    payload += "Name does not only contain alphanumericals";
  let isEmail = EMAIL_REGEX.test(email);
  if (email.length < 5) payload += ":Email too short";
  else if (!EMAIL_REGEX.test(email)) payload += ":Not a email";
  if (profanityFilter.isProfane(username) || profanityFilter.isProfane(email))
    payload += "Profane credentials";
  console.log(payload);
  return payload;
};

/**
 * Builds payload suitable for client interpretation
 * @param {String} user User UUID.
 * @param {String} action Action for the clien to perform
 * @param {String | null} payload Data required for action to be processed/performed. If !payload "none" is sent instead
 * @returns The built payload message suitable to be sent to the client
 */
module.exports.buildPayload = (user, action, payload) => {
  return (
    `{"uuid":"${user}","action":"${action}","payload":` +
    (payload ? payload : '"none"') +
    `}`
  );
};

const prependZero = (num) => {
  return num < 10 ? "0" + num : num;
};
module.exports.getTimestamp = () => {
  const date = new Date();
  let result = date.getFullYear() + "/";
  result += prependZero(date.getMonth()) + "/";
  result += prependZero(date.getDate()) + "/ ";
  result += prependZero(date.getHours()) + ":";
  result += prependZero(date.getMinutes()) + ":";
  result += prependZero(date.getSeconds());
  return result;
};
