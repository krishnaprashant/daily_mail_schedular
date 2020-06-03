/*
Author Prashant Krishna
*/



var nodemailer = require('nodemailer');
var reciepentData = require('./url')


reciepentData.forEach(function (item) {
    msg = "hi,\n you can check your dashboard with this url below.\n" + '' + modifyUrl(item.url);
    sendEmail(item.subject,item.Email,msg);    
});


function modifyUrl(url) {



    var param_1 = url.split(';');

    var dates = param_1[1].split('_');
    var date_1 = dates[1];
    var date_2 = dates[2];

    url = url.replace(date_1, getPreviousDate());
    url = url.replace(date_2, getNextDate());
    return url;
}

function getPreviousDate() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - 1);
    var ts = Math.round((date).getTime() / 1000);
    return ts;
}

function getNextDate() {
    var date = new Date();
    date.setHours(24, 0, 0, 0);
    date.setDate(date.getDate() - 1);
    var ts = Math.round((date).getTime() / 1000);
    return ts;
}

function sendEmail(mail_subject, mail_email, mail_body) {

    var transporter = require("./config");

    var mailOptions = {
        from: 'prashantkrishna00@gmail.com',
        to: mail_email,
        subject: mail_subject,
        text: mail_body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}





