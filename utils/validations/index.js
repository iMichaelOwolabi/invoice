const Joi = require("joi");

const createInvoice = Joi.object()
  .options({ abortEarly: false })
  .keys({
    item: Joi.string().required(),
    amount: Joi.number().required(),
    quantity: Joi.number().required(),
  });

module.exports = {
  createInvoice
};
