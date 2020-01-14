const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tsp60_nu_tiadb'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected tsp60_nu_tiadb success');
});

module.exports = connection;