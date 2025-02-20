const PersonaRepository = require('../repositories/persona.repository');

/**
 * Valida que el correo no esté ya registrado.
 * @param {string} email 
 * @param {string|null} id - ID de la persona (en caso de actualización).
 */
async function validateEmailUnique(email, id = null) {
  const existing = await PersonaRepository.getPersonaByEmail(email);
  if (existing && (!id || existing._id.toString() !== id)) {
    // Lanza un error con código de estado 409 (Conflict)
    throw { status: 409, message: "El correo ya está registrado." };
  }
}

/**
 * Valida que el RFC no esté ya registrado.
 * @param {string} rfc 
 * @param {string|null} id - ID de la persona (en caso de actualización).
 */
async function validateRFCUnique(rfc, id = null) {
  const existing = await PersonaRepository.getPersonaByRFC(rfc);
  if (existing && (!id || existing._id.toString() !== id)) {
    throw { status: 409, message: "El RFC ya está registrado." };
  }
}

/**
 * Valida que la fecha de nacimiento tenga formato válido y que la edad sea mayor a 19.
 * @param {string|Date} fechaNacimiento 
 */
function validateAge(fechaNacimiento) {
  if (!fechaNacimiento) {
    throw { status: 400, message: "La fecha de nacimiento es requerida." };
  }
  const birthDate = new Date(fechaNacimiento);
  if (isNaN(birthDate.getTime())) {
    throw { status: 400, message: "Formato de fecha de nacimiento no válido." };
  }
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age <= 19) {
    throw { status: 400, message: "La edad debe ser mayor a 19 años." };
  }
}

module.exports = {
  validateEmailUnique,
  validateRFCUnique,
  validateAge
};
