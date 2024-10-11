const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// POST route to generate the PDF
router.post('/', certificateController.generateCertificate);

module.exports = router;
