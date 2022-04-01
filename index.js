const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express'),

swaggerDocument = require('./swagger.json');
const { invoiceRoute } = require("./routes/invoiceRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5001;

const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB successfully...");
  });

mongoose.connection.on("error", (err) => console.log(err.message));
mongoose.connection.on("disconnected", () =>
  console.log("Mongoose connection closed")
);

app.use("/api/v1/invoices", invoiceRoute);

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
