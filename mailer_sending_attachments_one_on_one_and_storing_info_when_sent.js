//This is mailer with attachments
//User sending mail to supplier
//Link 1:1 - 1 user, 1 supplier
//Example - mymail@gmail.com sends to yourmail@gmail.com and so on...


//packages that are used in this js file - promise mysql, nodemailer, date and time, cron
const mysql = require('promise-mysql');
const nodemailer = require("nodemailer");
let date = require('date-and-time');

//lets schedule this mailer to sent every 10 min mails from databases
 var CronJob = require('cron').CronJob;
 new CronJob('0,10,20,30,40,50 * * * *', function() {



let transporter = nodemailer.createTransport({
    host: "mail.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "mymail@gmail.com", // generated ethereal user
        pass: "password" // generated ethereal password
    }
});


const employees = ['title', 'text', 'from_mail', 'to_mail', 'cc_mail']

let now = new Date();
let now2 = date.format(now, 'DD-MM-YYYY HH:mm');
let sent_mail = "Mail sent: " + now2;


async function main() {

    try {


        let conn = await mysql.createConnection({
            host: '192.168.125.1',  //just example
            user: 'root',  //probably root
            password: 'pass',  //password
            port: '3307',   //MariaDB10 - 3307, MariaDB5 - 3306
            database: 'yourdatabase'
        })



        let mail2 = await conn.query("SELECT ?? from mail_notif_supplier", [employees]);

        let attachment = await conn.query("SELECT attachments from mail_notif_supplier");


        let mailOptions = {
            attachments: [
                {   // utf-8 string as an attachment
                    path: 'path/to/your/attachments/' + attachment[0].attachments
                }
            ]
        };



        for (var i = 0; i < mail2.length; i++) {


            
            var from_employees = [mail2[i].from_mail]
            console.log(from_employees);
            var to_suppliers = [mail2[i].to_mail]
            console.log(to_suppliers);
            var cc_employees = [mail2[i].cc_mail]
            console.log(cc_employees);

         



            let data = await conn.query("SELECT ?? FROM mail_notif_supplier", [employees])

            function mySubject() {

                return "New order";

            }




            function myTasks() {


                
                var data3 = [];
                data3.push(mail2[i].title + " <br> ");
                data3.push(mail2[i].text + " <br> ");



                return "Here are the items we need to order from you <br><br> " + data3.join("") + " <br> Please forward this mail to me with order status.<br> <br> Mail sent:<br> " + now2 + " <br> <br> Admin";





            }




            console.log(myTasks());


            //informations we send with transporter (mail)

            mailOptions.from = from_employees;
            mailOptions.to = to_suppliers;
            mailOptions.cc = cc_employees;
            mailOptions.subject = mySubject();
            mailOptions.html = myTasks();
            mailOptions.text = myTasks();
            mailOptions.priority = 'high';



            let test = await transporter.sendMail(mailOptions)


            //update last column with sent info
           

            let upisi = await conn.query('UPDATE mail_notif_supplier SET sent_info = ?', [sent_mail])

           
            //take and put info in next table and delete this table 

              let kopiraj = await conn.query('INSERT INTO ??(??) SELECT ?? FROM ?? ', ['mail_notif_supplier_all', columns, columns, 'mail_notif_supplier']);
              console.log("Podaci prebačeni u mail_notif_supplier_all za sve korisnike u " + now2);

            let izbrisi = await conn.query('DELETE FROM mail_notif_supplier WHERE status=1');
            console.log("Podaci izbrisani iz mail_notif_supplier!");

        }
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


