//ovaj mali programčić ispisuje nule i jedinice po korisniku, dakle ako ima u tablici mail_notif sent_mail 0 tada će ispisati za njega 0


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'xxxxx',
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
for(i=0;i<3;i++){


var employees_id = i;
var columns = ['sent_mail'];
var mail;
//function getInfo(callback){

var query = connection.query('SELECT ?? FROM ?? WHERE employees_id = ?', [columns, 'mail_notif', employees_id], function (error, results, fields) {
  if (error) throw error;
//  console.log(results[0].sent_mail);


 // mail = results;
 // console.log(mail);

 results.forEach(function(rows) {


 rows = JSON.stringify(results);

// console.log(rows);

var array1 = [rows];

array1.forEach(function(element) {
 console.log(element);
 if(element=='[{"sent_mail":1}]'){
 console.log("Mail allready sent to this user!");
}
else{
console.log("Mail will be sent to this user");

//dodati sve one querije koji fale






}

});//foreach rows


  });//foreach results
})  //query




}; //for petlja
