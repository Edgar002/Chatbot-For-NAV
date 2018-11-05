var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'p@ssw0rd',
        server: 'localhost', 
        database: 'Demo Database NAV (13-0)',
        options: {
            instanceName: '',
            database: 'Demo Database NAV (13-0)',  //the username above should have granted permissions in order to access this DB.
            debug: {
                packet: false,
                payload: false,
                token: false,
                data: false
            },
            encrypt: false
        } 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from [dbo].[CRONUS International Ltd_$Item]', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});