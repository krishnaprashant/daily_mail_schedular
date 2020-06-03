//////////////do not touch this code/////////////
var nodemailer = require('nodemailer');
//////////////do not touch this code/////////////


/*

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',//your smtp server
    port: 2525,//your server's port number
    auth: {
       user: 'put_your_username_here',
       pass: 'put_your_password_here'
    }
});

*/


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your gmail id',
        pass: 'your gmail password'
    }
});

module.exports = transporter;