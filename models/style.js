const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    component: { type: String, required: true }, 
    styles: { type: Object, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Style', styleSchema);
