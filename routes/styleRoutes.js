const express = require('express');
const { saveStyle, getStyle } = require('../controllers/styleController');

const router = express.Router();

router.post('/save', saveStyle);
router.get('/:userId', getStyle); 

module.exports = router;
