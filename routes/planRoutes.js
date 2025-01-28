const express = require('express');
const Planner = require('../model/planner');
const router = express.Router();

// travel plan
router.post('/', async (req, res) => {
    const { destination, startDate, endDate, activities } = req.body;
    try {
        const newPlan = new Planner({ destination, startDate, endDate, activities });
        await newPlan.save();
        res.status(201).json(newPlan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all plans
router.get('/', async (req, res) => {
    try {
        const plans = await Planner.find();
        res.status(200).json(plans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a plan by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const plan = await Planner.findById(id);
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        res.status(200).json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a plan
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { destination, startDate, endDate, activities } = req.body;
    try {
        const updatedPlan = await Planner.findByIdAndUpdate(
            id,
            { destination, startDate, endDate, activities },
            { new: true }
        );
        if (!updatedPlan) return res.status(404).json({ error: 'Plan not found' });
        res.status(200).json(updatedPlan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a plan
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPlan = await Planner.findByIdAndDelete(id);
        if (!deletedPlan) return res.status(404).json({ error: 'Plan not found' });
        res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
