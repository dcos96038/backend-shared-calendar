/*
  Rutas de /events
  host + /api/events
*/

const { isValid } = require('date-fns');
const express = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { fieldValidator } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/jwtValidator');

const router = express.Router();

// Aplicar el middleware a todas las rutas
router.use(validateJWT);

// Obtener eventos
router.get('/', getEvents);

// Crear evento
router.post(
  '/new',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Initial date is required').custom(isValid),
    check('end', 'Finalization date is required').custom(isValid),
    fieldValidator,
  ],
  createEvent
);

// Actualizar evento
router.put('/:id', updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;
