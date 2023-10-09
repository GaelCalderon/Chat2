const express = require('express'); //referencia a framework express
const app = express();//se crea la aplicacion de express
const log = require('morgan'); //saber los clientes conectados
const bodyParser = require('body-parser');
const path = require('path');

const IndexRoutes = require('./routers/index.js');
const { mongo, default: mongoose } = require('mongoose');

app.set('port', process.env.PORT || 3000); // asigno puerto 3000
//midelewarw utiliza morgar
app.use(log('dev'));
app.use(bodyParser.urlencoded({extended:false}));
//Rutas 
app.use('/',IndexRoutes);

app.listen(app.get('port'), () => {
    console.log('El servidor esta funcionando en el puerto', app.get('port'));
}

);

//conecion al a BD
mongoose.connect("mongodb+srv://node:DPkwUaILbGg558D5@cluster0.3wg4vdv.mongodb.net/Tienda?retryWrites=true&w=majority")
.then(bd=>console.log('BD conectada'))
.catch(err=>console.log(err));

//establecer un sistema de vistas
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');


//mensaje de conectado