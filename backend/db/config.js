const mongoose = require("mongoose")
mongoose
  .connect(
    "mongodb+srv://SPARK:SPARK@cluster0.jrdgd3q.mongodb.net/e-commerce?retryWrites=true&w=majority"

  )
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.warn(err);
  });