/*
 
$ isql-fb
Use CONNECT or CREATE DATABASE to specify a database

SQL> create database '/var/lib/firebird/3.0/data/test.fdb' user 'SYSDBA' password 'giorgio';
SQL> connect '/var/lib/firebird/3.0/data/test.fdb' user 'SYSDBA' password 'giorgio';

SQL> CREATE TABLE PEOPLE (ID INT NOT NULL PRIMARY KEY, NAME VARCHAR(25));
SQL> INSERT INTO PEOPLE VALUES (1, 'Angelo');
SQL> INSERT INTO PEOPLE VALUES (3, 'Giorgio');
SQL> INSERT INTO PEOPLE VALUES (2, 'Danilo');
SQL>  select * from PEOPLE;

          ID NAME
============ =========================
           1 Angelo
           3 Giorgio
           2 Danilo

SQL> commit;

*/

var Firebird = require('node-firebird')

var options = {}

options.host = '127.0.0.1'
options.port = 3050
options.database = '/var/lib/firebird/3.0/data/test.fdb'
options.user = 'sysdba'
options.password = 'masterkey'
options.lowercase_keys = false // set to true to lowercase keys
options.role = null            // default
options.pageSize = 4096        // default when creating database


Firebird.attach(options, function(err, db) {

    if (err)
        throw err

    // db = DATABASE
    db.query('SELECT * FROM PEOPLE', function(err, result) {

      //console.log(JSON.stringify(result, null, 2))
      result.forEach( row => console.log( row.ID, row.NAME.toString() ) )

      // IMPORTANT: close the connection
      db.detach()

    })

})

