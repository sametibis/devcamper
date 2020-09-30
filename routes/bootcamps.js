const express = require('express');
const router = express.Router();

// Bring methods in the Controller
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advencedResults = require('../middleware/advencedResults');

const courseRouter = require('./courses');
// Bootcamps içindeki kursları görüntülemek için kurs routera yönlendirdik. (Kurs router da { mergeParams: true } ile bunu yakalamamız gerek.)
router.use('/:bootcampId/courses', courseRouter);

router.get('/radius/:zipcode/:distance', getBootcampsInRadius);

router.get('/', advencedResults(Bootcamp, 'courses'), getBootcamps); // router.route('/').get(getBootcamps)

router.get('/:id', getBootcamp);

router.post('/', createBootcamp);

router.put('/:id', updateBootcamp);

router.delete('/:id', deleteBootcamp);

router.put('/:id/photo', bootcampPhotoUpload);

module.exports = router;
