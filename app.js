const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personasRoutes = require('./routes/persona.routes');
const productoRoutes = require('./routes/producto.routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/personas', personasRoutes);

//conexión a la base de datos

mongoose.connect('mongodb+srv://Hack17prank:Hack17prank@jbar.v8wwq.mongodb.net/inventary_db?retryWrites=true&w=majority&appName=Jbar')
    .then(() => {
        console.log('Connected to the database!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
    });
