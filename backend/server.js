const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5001;
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
app.use(express.json());

//db connection
connectDb();

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
