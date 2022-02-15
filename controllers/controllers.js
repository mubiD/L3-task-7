const express = require('express') //Require express.
const mongoose = require('mongoose'); //Require Mongoose
const Cars = require('../models/models.js'); //Require the Schema sent from models.js
const app = express() //Store Expresses functionality in variable.

const bodyParser = require('body-parser'); // Allows us access to the req.body object.
app.use(bodyParser.urlencoded({ extended: true })); //?
app.use(bodyParser.json()); //converts everything that is being sent back to react to JSON(It stringifys whatever is being sent eg. res.json({"item": webProjectArr})).

exports.create = async (req, res) => {
    // Create and Save a new Car
    // accessing the req.body allows us to utilize values sent from the frontend.
    let CarItem = new Cars({
        make: req.body.make,// {make} value which is sent over
        model: req.body.model,// {model} value which is sent over
        registration: req.body.registration,// {registration} value which is sent over
        owner: req.body.owner// {owner} value which is sent over
        //createDate: Date.now()
    });
    
    try {
        await CarItem.save(); //await creating the individual document.
            const cars = await Cars.find(); //Updating frotends state in order to show the user that the document has been successfully added to the collection.
            res.send(cars); //Send the relevant information back to the frontend.
    } catch(error) {
            console.log(error);
            res.send({ message: `Could not create new Car: ${error}!` }); //Error.
    }
};

exports.findAll = async (req, res) => {
    try{
        const cars = await Cars.find(); //await finding all the documents that exist within the collection/database.
        res.send(cars); //Send the relevant information that has been retrieved back to the frontend.
    } catch(error){
        res.send({ message: `Retrieval failed: ${error}!` }) //Error.  
    }
}

exports.findAllOld = async (req, res) => {
    try{
        //await finding all the documents that exist within the collection/database. 
        // All the documents have to be within the range of createDate[0-2017], meaning any cars older than 5 years old.
        const cars = await Cars.find({ createDate: { $gte : 0 , $lte : "2017-05-01T00:00:00.000Z" } });
        //Send the relevant information that ha been retrieved back to the frontend.
        res.send(cars);
    } catch(error){
        res.send({ message: `Retrieval failed: ${error}!` }) //Error.   
    }
}

exports.deleteCar = async (req, res) => {
    //await deleting the chosen document from the collection/database.
    //Use the _id to identify chosen document. 
    // Async - We neeed confoirmation from mongodb that the query has in actual fact been executed correctly, therefore mongodb returns a promise(mongoose.promise = global.promise).
    Cars.deleteOne({ _id: req.body.id }, async (error) => {
        try{
            // console.log("deleted!") 
            const cars = await Cars.find(); //Updating the frontends state in order to show the user that the document has been successfully added to the collection.
            res.send(cars); //Send the relevant information that ha been retrieved back to the frontend.
        }
        catch (error) {
            res.status(503).send({ message: "something went wrong!" });
        } 
    });
}

exports.updateCar = async (req, res) => {
   try {
       //Find the car Object(document) that you're wanting to update inside the collection/database.
       const car = await Cars.findById({ _id: req.body.id }); 
       //Compare req.body's fields with that of the Object found.
       //Create variables to store each field which has changed.
       //if car.make = req.body.makeUpdate or req.body.makeUpdate = null, => then car.make does not need to be updated, else update the value to what the user entered(req.body.makeUpdate)
       const makeNew = (car.make === req.body.makeUpdate || !req.body.makeUpdate) ? car.make: req.body.makeUpdate; 
       const modelNew = (car.model === req.body.modelUpdate || !req.body.modelUpdate) ? car.model: req.body.modelUpdate;
       const registrationNew = (car.registration === req.body.registrationUpdate || !req.body.registrationUpdate) ? car.registration: req.body.registrationUpdate;
       const ownerNew = (car.owner === req.body.ownerUpdate || !req.body.ownerUpdate) ? car.owner: req.body.ownerUpdate;

       await Cars.findByIdAndUpdate({ _id: req.body.id },
        {
            //Save the variables based on the comparison above to the database
            make: makeNew, 
            model: modelNew,
            registration: registrationNew,
            owner: ownerNew 
        });
        const cars = await Cars.find(); //Store the updated Object within a variable.
        res.send(cars); //Send the relevant information that has been updated back to the frontend.
   } catch(error) {
        res.send({ message: `something went wrong! ${error}` }) //If the [try] fails, the error is absorbed and caught within this [catch] block.
   }
}

exports.updateManyCars = async (req, res) => {
    try {
        
        // const cars = await Cars.find();
        
        let items = req.body.item; //Store the array of documents in a variable.
        // Iterate through the items array and update the _ids one at a time.
        items.forEach (async item => {
            await Cars.findByIdAndUpdate({ _id: item._id },
                {$set: {
                    make: item.make, 
                    model: item.model,
                    registration: item.registration,
                    owner: item.owner 
                }});
        });
        // const ownerNew = (car.owner === req.body.ownerGlobal || !req.body.ownerGlobal) ? car.owner: req.body.ownerGlobal; (POSSIBLY NOT NEEDED)
        const carsFull = await Cars.find(); //Store the updated Object within a variable.
        res.send(carsFull); //Send the relevant information that has been updated back to the frontend.
    } catch(error) {
         res.send({ message: `something went wrong! ${error}` }) //If the [try] fails, the error is absorbed and caught within this [catch] block.
    }
} 
 
 
 



