// https://www.npmjs.com/package/promise-mysql

const mysql = require('promise-mysql');
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "some mail host",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "some user", // generated ethereal user
        pass: "some password" // generated ethereal password
    }
});


const employees_id = 73;
const info = ['title', 'text', 'main_mail', 'datetime'];

let mailOptions = {
    from: '"Rosana" <r.duga@concepts.hr>',
};

async function main() {
    try {

        let conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Jpm123!',
            port: '3307',
            database: 'sac',
        })


        let data = await conn.query("SELECT ?? FROM mail_notif WHERE employees_id=?", [info, employees_id])


        var i;
        var broj = 0;

        function mySubject() {
            return "Unfinished task for this user ";
        }
        console.log(mySubject()); // Unfinished task for user Rosana


        function myTasks() {


            var data3 = [];
            for (let i = 0; i < data.length; i++) {
                data3.push(data[i].text + " <br> ");

                 
            }
    
         return "Ovo su taskovi koji u ovome trenutku nisu izvršeni: <br><br> " + data3;

        }

     

        console.log(myTasks()); 


        mailOptions.to = data[0].main_mail;
        mailOptions.subject = mySubject();
        mailOptions.html = myTasks();
        mailOptions.text = myTasks();

       
        let test = await transporter.sendMail(mailOptions)
      
    }
    catch (error) {
        console.error(error)
    }
    finally {
        conn.end();
    }
}

main();


