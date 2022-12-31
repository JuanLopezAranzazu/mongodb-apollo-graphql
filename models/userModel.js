const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  phone: {
    type: String,
    validate: {
      validator: (phone) => /^\d+$/.test(phone),
      message: "Incorrect or missing phone",
    },
  },
  position: {
    type: String,
    validate: {
      validator: (position) =>
        ["programmer", "fullstack", "tester"].includes(position),
      message: "Incorrect or missing position",
    },
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
