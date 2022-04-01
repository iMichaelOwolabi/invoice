const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0.00,
    },
    amount: {
      type: Number,
      default: 0.00,
    },
    total: {
      type: Number,
      default: 0.00,
    },
    tax: {
      type: Number,
      default: 0.00,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
