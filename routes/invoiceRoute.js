const express = require("express");
const router = express.Router();
const { createInvoice, getAllInvoice } = require("../controllers/invoice");


router.post("/", createInvoice); // Create a new invoice
router.get("/", getAllInvoice); // Get all invoice

module.exports.invoiceRoute = router;
