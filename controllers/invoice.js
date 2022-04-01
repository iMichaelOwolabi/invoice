const Invoice = require('../database/models/invoice')

const createInvoice = async (req, res) => {
  try {
    const { amount, quantity, item } = req.body;
  
    const subTotal = +amount * +quantity;
  
    // Say tax is 7.5% of the subTotal amount
    const tax = subTotal * 0.075 
  
    const total = subTotal + tax;
  
    // Create the invoice record
    const invoice = await Invoice.create({
      item,
      amount,
      quantity,
      tax,
      total,
    });

    // Notify the client of invoice creation
    return res.status(201).json({
      sucess: true,
      message: 'Invoice created successfully',
      data: invoice
    })
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      sucess: false,
      message: 'Server error, please try again later',
    })
  }
}

const getAllInvoice = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const [invoices, count] = await Promise.all([
      Invoice.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ updateAt: -1 })
      .exec(),

      Invoice.countDocuments()
    ]);

    // Return invoices fiund in the system
    return res.status(201).json({
      sucess: true,
      message: 'All invoice in the system',
      data: { invoices, count }
    })
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      sucess: false,
      message: 'Server error, please try again later',
    })
  }
}

module.exports = {
  createInvoice,
  getAllInvoice,
}