const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);
router.get('/concerts/random', ConcertsController.getRandom);
router.get('/concerts/:id', ConcertsController.getById);
router.post('/concerts', ConcertsController.postConcert);
router.put('/concerts/:id', ConcertsController.modifyConcert);
router.delete('/concerts/:id', ConcertsController.deleteConcert);

module.exports = router;