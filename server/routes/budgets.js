const express = require('express');
const Budget = require('../models/Budget');

const router = express.Router();

router.get('/:month', async (req, res) => {
    try {
        const budgets = await Budget.find({ month: req.params.month });
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { category, amount, month } = req.body;
        const budget = await Budget.findOneAndUpdate(
            { category, month },
            { amount },
            { upsert: true, new: true }
        );
        res.json(budget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;