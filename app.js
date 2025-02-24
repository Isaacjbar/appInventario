const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const personasRoutes = require("./routes/persona.routes");
const productosRoutes = require("./routes/producto.routes");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use("/api/personas", personasRoutes);
app.use("/api/productos", productosRoutes);

// conexion a la base de datos


mongoose.connect("mongodb+srv://20233tn149:alahuakbar28@cluster0.shtpq.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=Cluster0",{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Conexión a la base de MongoDB exitosa");
    app.listen(PORT,()=>{
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
});


// mongodb+srv://20233tn149:<db_password>@cluster0.shtpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
