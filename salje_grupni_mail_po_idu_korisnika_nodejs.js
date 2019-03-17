
//kandi sumira te šalje mail po ID-u

// https://www.npmjs.com/package/promise-mysql

const mysql = require('promise-mysql');
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "xxxxxxxxx",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "xxxxxxxxxx", // generated ethereal user
        pass: "xxxxxxxx" // generated ethereal password
    }
});





const employees_id = ["12", "73"];
const info = ['title', 'text', 'main_mail', 'datetime'];





let mailOptions = {
    from: '"xxxxxx" <xxxxxxxxxx>',
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

        var j = 0;
        for (; j < employees_id.length; j++) {
            console.log(employees_id[j]);
        

        let data = await conn.query("SELECT ?? FROM mail_notif WHERE employees_id=?", [info, employees_id[j]])
       

        var i;
        var broj = 0;

        function mySubject() {
            return "Unfinished task for this user ";
        }
        console.log(mySubject()); // Unfinished task for user Rosana


        function myTasks() {


            var data3 = [];
            //alert(data3.join(""));
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i].text);
                data3.push(data[i].text + " <br> ");


            }

            return "Ovo su taskovi koji u ovome trenutku nisu izvršeni: <br><br> " + data3.join("");

        }



        console.log(myTasks());


        mailOptions.to = data[0].main_mail;
        mailOptions.subject = mySubject();
        mailOptions.html = myTasks();
        mailOptions.text = myTasks();

        //console.log(mailOptions)
        let test = await transporter.sendMail(mailOptions)
        //console.log(test)
        }
    }
    catch (error) {
        console.error(error)
    }
    finally {
        conn.end();
    }
}

main();

//}
