const express = require('express') //Require Express.
const app = express() //Store Expresses functionality in variable.
const mongoose = require('mongoose'); //Require Mongoose.

const bodyParser = require('body-parser'); // Allows us access to the req.body object.
app.use(bodyParser.urlencoded({ extended: true })); //This middleware is used to make sure that the incoming message's(from react, ie req.body) content matches the content type("Content-Type": "application/json") which is specified in React
app.use(bodyParser.json()); //converts everything that is being sent back to react to JSON(It stringifys whatever is being sent eg. res.json({"item": webProjectArr})).

const routes = require('./routes/requests.js'); //Require routes from ./routes/requests.js.
app.use('/', routes); //attaching the functionality within routes/requests.js to the express server(This is for route handling ie the '/')

const helmet = require("helmet"); //Require Helmet.
app.use(helmet()); //Use Helmet.

app.use(express.urlencoded({ extended: false })) // So that our req.body can contain values that are either strings and arrays.

//Connection URL
const uri = 'mongodb+srv://BRAASH:Aventador93@cluster0.akhvd.mongodb.net/Cars?retryWrites=true&w=majority';
mongoose.Promise = global.Promise; // Nodes Promise property within the global object equals mongoose's Promise property.
// If we want to use mongoose in different position inside the codes it must be viewed as global mode, that's why we need to set mongoose as : mongoose.Promise = global.Promise; 

//Port listening at:
const PORT = process.env.PORT || 9000; 

mongoose.connect('mongodb+srv://BRAASH:aVENTADOR93@cluster0.akhvd.mongodb.net/',{
    dbName: 'Cars' // Connect to the Cars db.
}).then( result => {
    console.log('mongoose connected!');
}).catch(err => console.log(err));

const db = mongoose.connection; //Store mongoose.connection inside db variable.

db.once('open', function() {
    console.log("Successfully connected to the database");

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    }); // Listening at PORT = process.env.PORT || 8080;
});

db.on('error', function() {
	console.log('Could not connect to the database. Exiting now...');
    process.exit(); 
});