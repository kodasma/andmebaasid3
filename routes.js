var sql = require('./sql');

exports.index = function(req, res) {
    res.send('<h1>Hello</h1>');
}

exports.users = function(req, res) {
    var query = 'select * from dbo.[User]';

    // If there's an ID passed along
    if (typeof(req.params.id) !== 'undefined') {
        query = query.concat(' where id=' + req.params.id);
    }
    var result = sql.querySql(query, function(data) {
        if (data !== undefined) {
            console.log('DATA rowsAffected: ' + data.rowsAffected);
            res.send(data.recordset);
        }
    }, function(err) {
        console.log('ERROR: ' + err);
    });
}

exports.paring1 = function(req, res) {
    var query = "SELECT * FROM dbo.[User] WHERE Username = 'plauga1i';";

    var result = sql.querySql(query, function(data) {
        if (data !== undefined)
        {
            console.log('DATA rowsAffected: ' + data.rowsAffected);
            res.send(data.recordset);
        }
    }, function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: ' + err);
    });
}

exports.paring2 = function(req, res) {
    var query = "SELECT Username, Name, PostID, Comment FROM dbo.[User] INNER JOIN dbo.[Comment] ON dbo.[User].ID = dbo.[Comment].UserID WHERE UserID BETWEEN 50 AND 55;";

    var result = sql.querySql(query, function(data) {
        if (data !== undefined)
        {
            console.log('DATA rowsAffected: ' + data.rowsAffected);
            res.send(data.recordset);
        }
    }, function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: ' + err);
    });
}

exports.paring3 = function(req, res) {
    var query = "SELECT Username, COUNT(dbo.[Post].ID) AS PostCount FROM dbo.[User] INNER JOIN dbo.Post ON dbo.[User].ID = dbo.[Post].UserID WHERE CreationTime BETWEEN '2017-12-30' AND '2018-12-10' GROUP BY Username;";

    var result = sql.querySql(query, function(data) {
        if (data !== undefined)
        {
            console.log('DATA rowsAffected: ' + data.rowsAffected);
            res.send(data.recordset);
        }
    }, function(err) {
        console.log('ERROR: ' + err);
        res.status(500).send('ERROR: ' + err);
    });
}

exports.default = function(req, res) {
    res.status(404).send('Invalid route');
}