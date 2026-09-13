const express = require("express");

const { validateToken, getValidations, getValidationById, deleteValidation, deleteAllValidations } = require("../controllers/tokenController");

const router = express.Router();

router.post("/validate", validateToken);

router.get("/validations", getValidations);

router.get("/validations/:id", getValidationById);

router.delete("/validations/:id", deleteValidation);

router.delete("/validations", deleteAllValidations);

module.exports = router;