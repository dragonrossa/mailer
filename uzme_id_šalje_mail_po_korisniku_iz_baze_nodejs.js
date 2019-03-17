
//use cronjob to automatic the job on every 10 minutes

var CronJob = require('cron').CronJob;
new CronJob('0,10,20,30,40,50 * * * *', function() {
  console.log('Updating from 0 to 1 every 10 minutes. All the messages have been sent to users!');
}, null, true, 'America/Los_Angeles');



//baza.js - connect to database sac and table mail_notif

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'some user',
  password: 'some password',
  port: '3307',
  database: 'sac',
  table: 'mail_notif'
});



connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


//update status from 0 to 1

var i;
for(i=1;i<3;i++){

connection.query(


'UPDATE mail_notif set STATUS = 1 WHERE employees_id=? AND sent_mail = 1',

  [i],
  (err, result) => {
    if (err) throw err;

    console.log(`Changed ${result.changedRows} row(s)`);

});

//read from database text to send it via mail to user



// test2 callback working

function getText(callback) {
    connection.query("SELECT text FROM mail_notif WHERE employees_id=?", [i], function (err, result) {
        if (err) throw err;
        callback((result.length > 0) ? result[0].text : "");
    });
}






getText(function (result) {
    console.log(result);
    myTekst = "Hello! Here is your unfinished task. Please, finish it soon..\n <br><br>" + result;



});

  function getTaskId(callback) {
        connection.query("SELECT id FROM mail_notif WHERE employees_id=?", [i], function (err, result) {
            if (err) throw err;
            callback((result.length > 0) ? result[0].id : "");
        });
    }

    getTaskId(function (result) {
        console.log(result);


        myTask = "Your task with ID " + result + " needs check";

   });

//test3 callback for mails

function getMail(callback) {
    connection.query("SELECT main_mail FROM mail_notif WHERE employees_id=?", [i], function(err, result) {
        if (err) throw err;
        callback((result.length > 0) ? result[0].main_mail : "");
    });
}

getMail(function (result) {
    console.log(result);
   myMail=result;




//send mails to myself after update

"use strict";
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.concepts.hr",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user:"some user", // generated ethereal user
      pass:"some password" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: "some mail",
    to: myMail, // list of receivers
    subject: myTask, // Subject line
    text: myTekst, // plain text body
    html: myTekst // html body

  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <r.duga@concepts.hr>
  // Preview URL: Status change from 1 to 0
}

main().catch(console.error);

});
}
