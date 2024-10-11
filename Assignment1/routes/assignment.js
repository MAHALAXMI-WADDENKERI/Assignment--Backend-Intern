const express = require('express');
const { upload, getAssignmentsForAdmin, updateStatus } = require('../controllers/assignmentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/upload', auth, upload);
router.get('/assignments', auth, getAssignmentsForAdmin);
router.post('/assignments/:id/accept', auth, (req, res) => updateStatus(req, res, 'accepted'));
router.post('/assignments/:id/reject', auth, (req, res) => updateStatus(req, res, 'rejected'));

module.exports = router;
