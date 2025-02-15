// this folder contain on Schema or structure that save data of user  in this structure or standard in database which must work after run app.js 


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
// mean-> shape of data that i need to send database
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  age: Number,
  country: String,
  gender: String
},
{ timestamps: true }
);


// Create a model based on that schema
const User = mongoose.model("customer", userSchema);


// export the model
module.exports = User;