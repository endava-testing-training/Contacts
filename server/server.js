var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var contactsController = require('./controller/contactsController');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.get("/loadcontact", contactsController.loadContact);
app.post("/newcontact", contactsController.newContact);
app.post("/updatecontact", contactsController.updateContact);


app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

