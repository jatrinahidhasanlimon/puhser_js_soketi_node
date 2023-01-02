function getByEmail(email, callback) {
    const mysql = require('mysql');
    // const connection = mysql.createConnection({
    //   host: 'dev-mysql-do-user-4241529-0.b.db.ondigitalocean.com',
    //   port: '25060',
    //   user: 'adminpaneluser',
    //   password: 'OTLTFdbJjPbXy1PH',
    //   database: 'jatri_intercity_periphery'
    // });
  
    // const connection = mysql.createConnection({
    //   host: '18.138.218.206',
    //   port: '3306',
    //   user: 'superadmin2',
    //   password: 'superadmin2',
    //   database: 'ride_sharing'
    // });
    const connection = mysql.createConnection({
      host: '206.189.149.36',
      port: 3306,
      user: 'superadmin',
      password: 'superadmin',
      database: 'test_laravel_deployment'
    });
  
    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
    
        console.log('Connected to the MySQL server.');
      });
  
//     const query = 'SELECT * FROM drivers WHERE email = ?';
//     function callback(){
//         console.log('Console from callback')
//       }
//     connection.query(query, [ email ], function(err, results) {
//       console.log('hey', err);
//       if (err) return callback(err);
//       if (results.length === 0) return callback(null);
//       const user = results[0];
//    callback(null, {
         
//           email: user.email
//         });
      
//     });
  }
 
  getByEmail()