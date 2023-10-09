const express = require('express');
const router = express.Router();
const net = require('net');
const model = require('../models/datos.js')();
const Producto = require('../models/datos.js');

const servidor = {
    port: 3000,
    host: 'localhost'
}
const client = net.createConnection(servidor);

client.on('connect', () => {
    console.log('Conexión satisfactoria');
});

let mensaje = '';

client.on('data', (data) => {
    mensaje = data.toString('utf-8');
    console.log('Mensaje del servidor: ' + mensaje);
});

// Express routes

router.get('/', async (req, res) => {
    try {
        const datos = await Producto.find();
        res.render('index.ejs', { datos, mensaje });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/send', async (req, res) => {
    const datos = req.body;
    if (datos && typeof datos.mensaje === 'string') {
        console.log("Mensaje de: " + datos.mensaje);
        client.write(datos.mensaje);
    } else {
        console.error("Error: 'mensaje' no es una cadena válida");
    }
    res.redirect('/');
});

router.get('/registro', (req, res) => {
    res.render('registro.ejs');
});

router.post('/add', async (req, res) => {
    const valor = new Producto(req.body);
    console.log(req.body);
    await valor.save();
    res.redirect('/');
});

router.get('/eliminar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Producto.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
