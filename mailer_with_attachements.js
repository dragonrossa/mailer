const mysql = require('promise-mysql');
const nodemailer = require("nodemailer");
let date = require('date-and-time');

//sending mail every 10 minutes

 var CronJob = require('cron').CronJob;
 new CronJob('0,10,20,30,40,50 * * * *', function() {



let transporter = nodemailer.createTransport({
    host: "mail.host.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "username", // generated ethereal user
        pass: "password" // generated ethereal password
    }
});



const info = ['title', 'text', 'main_mail', 'datetime'];

var columns = ['id', 'status', 'title', 'text', 'main_mail', 'cc_mail', 'datetime', 'employees_id', 'sent_mail', 'attachments'];

let now = new Date();
let now2 = date.format(now, 'DD-MM-YYYY HH:mm');



async function main() {



    try {



        let conn = await mysql.createConnection({
            host: 'ip adress', //for example - 192.168.10.12 or maybe 172.16.0.5
            user: 'user',
            password: 'password',
            //port depends of servers database - 3306, 3307
            port: '3307',
            database: 'database'
        })

        let attachment = await conn.query("SELECT attachments from mail_notif");
        console.log(attachment[0].attachments);


        let mailOptions = {
            from: '"sender mail"',
            attachments: [
                {   // utf-8 string as an attachment
                    //also this is the path somewehere in your Linux server, i put mine in /mail/
                    path: '/mail/'+ attachment[0].attachments
                }
            ]
        };


        let mail2 = await conn.query("SELECT DISTINCT main_mail,cc_mail from mail_notif");



        for (var i = 0; i < mail2.length; i++) {

            const users2 = [mail2[i].main_mail];
            const cc = [mail2[i].cc_mail];


            uniqueArray2 = users2.filter(function (elem, pos) {
                return users2.indexOf(elem) == pos;
            })

            console.log(uniqueArray2);

            uniqueArray3 = cc.filter(function (elem, pos) {
                return cc.indexOf(elem) == pos;
            })

            console.log(uniqueArray3);




            var employees = uniqueArray2;
            var cc_employees = uniqueArray3;



            let data = await conn.query("SELECT ?? FROM mail_notif WHERE main_mail=?", [info, employees])

            function mySubject() {
                return "PLM notification ";



            }




            function myTasks() {


                var data3 = [];



                for (let i = 0; i < data.length; i++) {

                    data3.push(data[i].title + " <br> ");
                    data3.push(data[i].text + " <br> ");

                }


                return "PLM TASK REMINDER <br><br> " + data3.join("") + " <br> Check your unfinished tasks on PLM web page.<br> <br> Mail sent:<br> " + now2 + " <br> <br> PLM Admin";



            }




            console.log(myTasks());



            mailOptions.to = employees;
            mailOptions.cc = cc_employees;
            mailOptions.subject = mySubject();
            mailOptions.html = myTasks();
            mailOptions.text = myTasks();
            mailOptions.priority = 'high';



            let test = await transporter.sendMail(mailOptions)



        }


        let kopiraj = await conn.query('INSERT INTO ??(??) SELECT ?? FROM ?? ', ['mail_notif_all', columns, columns, 'mail_notif']);
        console.log("Podaci prebačeni u mail_notif_all za sve korisnike u " + now2);

        let izbrisi = await conn.query('DELETE FROM database.mail_notif WHERE status=1');
        console.log("Podaci izbrisani iz mail_notif!");


    }
    catch (error) {
        console.error(error)

        conn.end();
    }
    finally {



        console.log("Waiting for new input");
    }
}


main();

 console.log('Updating from 0 to 1 every 10 minutes. All the messages have been sent to users!');
  }, null, true, 'Europe/Zagreb');

