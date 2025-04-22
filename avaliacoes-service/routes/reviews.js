const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.post('/', controller.createReview);
router.get('/', controller.getReviews);
router.delete('/:id', controller.deleteReview);

module.exports = router;
