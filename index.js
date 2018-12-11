var express = require('express');
var routes = require('./routes');

var app = express();

app.get('/', routes.index);
app.get('/api/users', routes.users);
app.get('/api/users/:id?', routes.users);

//kodutöös ette nähtud päringud
app.get('/api/paring1', routes.paring1);
app.get('/api/paring2', routes.paring2);
app.get('/api/paring3', routes.paring3);

app.get('*', routes.default);

var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});