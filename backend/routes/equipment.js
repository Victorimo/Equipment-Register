const router = require('express').Router();
const Equipment = require('../models/Equipment');

// Create Equipment
router.post('/', async (req, res) => {
  const equipment = new Equipment(req.body);
  try {
    const savedEquipment = await equipment.save();
    res.json(savedEquipment);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get All Equipment
router.get('/', async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Specific Equipment
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    res.json(equipment);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Equipment
router.put('/:id', async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedEquipment);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete Equipment
router.delete('/:id', async (req, res) => {
  try {
    const removedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    res.json(removedEquipment);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
