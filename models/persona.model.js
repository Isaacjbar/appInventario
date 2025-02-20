const mongoose = require('mongoose');

const PersonaSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    fechaNacimiento: {type: Date, required: true},
    rfc: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('Persona', PersonaSchema);