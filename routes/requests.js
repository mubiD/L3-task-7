const express = require('express'); //Require express.
const app = express() //Store Expresses functionality in variable.
const carManip = require('../controllers/controllers.js'); //Require the functionality within controllers.js.

app.post("/addDocument", carManip.create); //Create documents.

app.get("/getDocuments", carManip.findAll); //Read documents from Main.js.

app.get("/getDocumentsFDTN", carManip.findAllOld); //Read documents from foundationals.js

app.get("/getDocumentsGlobal", carManip.findAll); //Read documents from global.js.

app.put("/updateDocument", carManip.updateCar); //Update individual documents.

app.put("/updateDocumentsGlobal", carManip.updateManyCars); //Update multiple documents.

app.delete("/deleteDocument", carManip.deleteCar); //Delete documents with deleteCar.

module.exports = app; //Exporting app an its methods ie post, put, get and delete.