const Assignment = require('../models/assignment');

// Upload an assignment
exports.upload = async (req, res) => {
  const { task, adminId } = req.body;
  const userId = req.user.id;
  try {
    const assignment = new Assignment({ userId, task, adminId });
    await assignment.save();
    res.status(201).json({ msg: 'Assignment uploaded successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get assignments for admin
exports.getAssignmentsForAdmin = async (req, res) => {
  const adminId = req.user.id;
  try {
    const assignments = await Assignment.find({ adminId }).populate('userId', 'name').exec();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Accept or Reject assignment
exports.updateStatus = async (req, res) => {
  const { status } = req.body; // 'accepted' or 'rejected'
  const { id } = req.params;
  try {
    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ msg: 'Assignment not found' });

    assignment.status = status;
    await assignment.save();
    res.json({ msg: `Assignment ${status} successfully` });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
