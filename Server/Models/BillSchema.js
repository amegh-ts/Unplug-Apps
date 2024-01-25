const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    vrNo: { type: Number, required: true },
    vrDate: { type: String, required: true },
    name: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    allItems: { type: Array, required: true },
}, { timestamps: true })

module.exports = mongoose.model("bills", billSchema)