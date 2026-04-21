const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
        type: String,
        enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'],
        required: true
    },
    date: { type: Date, default: Date.now },
    note: { type: String }
});

module.exports = mongoose.model('Expense', ExpenseSchema);