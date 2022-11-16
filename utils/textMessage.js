require('dotenv').config();
const accountSid = process.env.SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
.create({body: 'Hi there', from: '+18304457546', to: '+18764183630'})
.then(message => console.log("Message Sent"));