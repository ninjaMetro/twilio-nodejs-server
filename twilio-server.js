/** Custom Packages */
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const twilioClient = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

/** Configurations */
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Send Custom SMS */
app.post('/sendsms', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const text = req.body.text;

    twilioClient.messages.create({
        to: phoneNumber,
        from: process.env.NUMBER,
        body: text
    }, function(error, response) {
        if(error) {
            console.log(error.message);
            res.json({ error: error.message})
        } else {
            console.log(response);
            res.json({ success: response})
        }
    })
});

/** TODO: Send SMS with CRON JOB everyday at 1200 HRS */

app.listen(3000, () => console.log('Twilio Server Started Successfully'));

