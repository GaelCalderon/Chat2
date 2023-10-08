const express = require('express');
const router =  express.Router();
const model = require('../models/datos.js')();
const Producto = require('../models/datos.js');

router.get('/', async (req, res) => {
    
        const datos = await Producto.find();
        console.log(datos);
        res.render('index.ejs', {
            datos
        });
    } 
);
router.post('/add', async (req, res) =>{
    const valor = new Producto(req.body);
    console.log(req.body);
    await valor.save();
    res.redirect('/');
});
router.get('/del/:id', async(req, res) =>{
    const {id}=req.params;
    await Producto.findByIdAndRemove;
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

// Ruta para mostrar la página principal
router.get('/', async (req, res) => {
    try {
        const datos = await Producto.find();
        res.render('index.ejs', {
            datos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});


module.exports = router;