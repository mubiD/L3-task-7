const mongoose = require('mongoose'); //Require Mongoose.

//Build Schema for documentation.
let Cars = mongoose.Schema({
  make:{
      type:String,
      required:true
  },
  model:{
      type:String,
      required:true
  },
  registration:{
      type:String,
      required:true,
  },
  owner:{
      type:String,
      required:true,
  },
  createDate:{
      type:Date,
      required:false,
      default: Date.now
  }
});

//Create the Cars model using mongoose.
module.exports = mongoose.model('cars', Cars);