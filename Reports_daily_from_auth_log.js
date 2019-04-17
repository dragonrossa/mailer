//packages needed for this report

const nodemailer = require("nodemailer");
let date = require('date-and-time');
let shell = require('shelljs');


//define CronJob at 23:55 every day

 var CronJob = require('cron').CronJob;
 new CronJob('55 23 * * *', function() {

// mail informations for sender

let transporter = nodemailer.createTransport({
    host: "mail",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "user", // generated ethereal user
        pass: "password" // generated ethereal password
    }
});


//todays date that we later use for creating attachements and sending the same one with todays date

let now = new Date();
let datum = date.format(now, 'YYYY-MM-DD');
let an_hour_ago = date.addHours(now, +2);
let vrijeme = date.format(an_hour_ago, 'hh:mm:ss', true);


async function main() {


    try {


    
        //subject used in mail

        function mySubject() {
            return "(X-Server) Info for day " + datum;


        }



        //shell script stored in /reports/ folder on server

        shell.grep('--', datum, '/var/log/auth.log').to('/reports/' + datum + ".txt"); // Search for "-v", no grep options


        //mail options for sender


        let mailOptions = {
            from: '"Mail admin" <mail>',
            attachments: [
                {   // utf-8 string as an attachment
                    path: '/reports/' + datum + ".txt"
                }
            ]
        };


        //other mail options that are changed so we call them like this

        mailOptions.to = "mymail@gmail.com";
        mailOptions.subject = mySubject();
        mailOptions.html = "Hello, this is your daily X - Server report for today. <br><br> " + datum + " " + vrijeme + "<br><br>  Admin ";
        mailOptions.text = "Hello, this is your daily X - Server report for today. <br><br> " + datum + " " + vrijeme + "<br><br>  Admin ";
        mailOptions.priority = 'high';


        //send mail to mymail@gmail.com

        let test = await transporter.sendMail(mailOptions)



    }
    catch (error) {
        console.error(error)
    }

    finally {

    }


}



main();

console.log("Mail sent for (X-Server) for " + datum);

  }, null, true, 'Europe/Zagreb');
