const mongoose = require("mongoose");

const validationSchema = new mongoose.Schema({
    valid: Boolean,
    expired: Boolean,
    algorithm: String,
    issuer: String,
    audience: String,
    claims: Object,
    validatedAt: Date
})

module.exports = mongoose.model("Validation", validationSchema);