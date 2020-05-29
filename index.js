/*

Author Prashant Krishna

*/

var nodemailer = require('nodemailer');
var urlListText = readTextFile();
var urlList = urlListText.split('$$');


function readTextFile(){
    const fs = require('fs');
    try {        
        const data = fs.readFileSync('text_498.txt', 'UTF-8');
        const lines = data.split(";");
        var rawLines = "";        
        lines.forEach((line) => {
            rawLines += line;        
        });
        return rawLines;        
    } catch (err) {
        console.error(err);
    }
}

function modifyUrl(url) {
    
    
    
    var param_1 = url.split('^');
    
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



function sendEmail(mail_subject,mail_email,mail_body){
   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prashantkrishna00@gmail.com',
            pass: 'Welcome@1234_'
        }
    });

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

urlList.forEach((item, index) => {
    var url_ = item.split("**")[0];
    url_ = modifyUrl(url_);
    url_ = url_.replace(/\^/g, ";");    
    var subject_ = item.split("**")[1];
    msg = "hi,\nyou can check your dashboard with this url below\n."+''+url_;
    sendEmail(subject_,"prashantkrishna5@gmail.com",msg);
});

