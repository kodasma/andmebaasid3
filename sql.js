var mssql = require('mssql');

var config = {
    user: 'testapp',
    password: 'testapp',
    server: 'localhost',
    database: 'MinuRakendus',
    connectionTimeout: 5000,
    options: {
        encrypt: false
    }
}

var pool;

(async function() {
    try {
        pool = await mssql.connect(config);

        console.log('Connected to DB');
    } catch (err) {
        console.log('ERROR: ' + err);
    }
})()

exports.querySql = function(query, onData, onError) {
    try {
        pool.request()
            .query(query)
            .then(result => {
                if (onData !== undefined) {
                    onData(result);
                }
            })
            .catch(error => {
                if (onError !== undefined) {
                    onError(error);
                }
            });
    } catch (err) {
        if (onError !== undefined) {
            onError(err);
        }
    }
}

mssql.on('error', err => {
    console.log('Error with MSSQL: ' + err);
})