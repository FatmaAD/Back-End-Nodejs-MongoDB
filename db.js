const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://fatma:2314876abc@cluster0-xph4u.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);
