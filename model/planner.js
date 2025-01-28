const mongoose = require('mongoose')

const plannerSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: { type: [String], default: [] }
})


const Planner = mongoose.model('Planner',plannerSchema)
module.exports = Planner