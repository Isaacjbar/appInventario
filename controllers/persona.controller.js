const PersonaService = require("../services/persona.service");

class PersonaController {
  async getAllPersonas(req, res) {
    try {
      const personas = await PersonaService.getAllPersonas();
      res.status(200).json(personas);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPersonaById(req, res) {
    const { id } = req.params;
    try {
      const persona = await PersonaService.getPersonaById(id);
      res.status(200).json(persona);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPersonaByRFC(req, res) {
    const { rfc } = req.params;
    try {
      const persona = await PersonaService.getPersonaByRFC(rfc);
      res.status(200).json(persona);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPersonaByEmail(req, res) {
    const { email } = req.params;
    try {
      const persona = await PersonaService.getPersonaByEmail(email);
      res.status(200).json(persona);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createPersona(req, res) {
    const persona = req.body;
    try {
      // Validación: Verificar que el correo no esté ya registrado
      const existingEmail = await PersonaService.getPersonaByEmail(persona.email);
      if (existingEmail) {
        return res
          .status(409)
          .json({ message: "El correo ya está registrado." });
      }

      // Validación: Verificar que el RFC no esté ya registrado
      const existingRFC = await PersonaService.getPersonaByRFC(persona.rfc);
      if (existingRFC) {
        return res
          .status(409)
          .json({ message: "El RFC ya está registrado." });
      }

      // Validación: La fecha de nacimiento es requerida y debe ser un Date válido
      if (!persona.fechaNacimiento) {
        return res
          .status(400)
          .json({ message: "La fecha de nacimiento es requerida." });
      }
      const birthDate = new Date(persona.fechaNacimiento);
      if (isNaN(birthDate.getTime())) {
        return res
          .status(400)
          .json({ message: "Formato de fecha de nacimiento no válido." });
      }
      // Cálculo de la edad
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (age <= 19) {
        return res
          .status(400)
          .json({ message: "La edad debe ser mayor a 19 años." });
      }

      const newPersona = await PersonaService.createPersona(persona);
      res.status(201).json(newPersona);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePersona(req, res) {
    const { id } = req.params;
    const persona = req.body;
    try {
      // Validación: Si se actualiza el correo, verificar que no esté asignado a otro usuario
      if (persona.email) {
        const existingEmail = await PersonaService.getPersonaByEmail(persona.email);
        if (existingEmail && existingEmail._id.toString() !== id) {
          return res
            .status(409)
            .json({ message: "El correo ya está registrado." });
        }
      }

      // Validación: Si se actualiza el RFC, verificar que no esté asignado a otro usuario
      if (persona.rfc) {
        const existingRFC = await PersonaService.getPersonaByRFC(persona.rfc);
        if (existingRFC && existingRFC._id.toString() !== id) {
          return res
            .status(409)
            .json({ message: "El RFC ya está registrado." });
        }
      }

      // Validación: Si se actualiza la fecha de nacimiento, debe ser un Date válido y la edad debe ser mayor a 19
      if (persona.fechaNacimiento) {
        const birthDate = new Date(persona.fechaNacimiento);
        if (isNaN(birthDate.getTime())) {
          return res
            .status(400)
            .json({ message: "Formato de fecha de nacimiento no válido." });
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        if (age <= 19) {
          return res
            .status(400)
            .json({ message: "La edad debe ser mayor a 19 años." });
        }
      }

      const updatedPersona = await PersonaService.updatePersona(id, persona);
      res.status(200).json(updatedPersona);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletePersona(req, res) {
    const { id } = req.params;
    try {
      await PersonaService.deletePersona(id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

// Exporta una instancia de la clase, no la clase en sí
module.exports = new PersonaController();
