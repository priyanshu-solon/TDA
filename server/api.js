//SETUP AND CONFIGURATION

//imports mongodb client to connect database
const mongoClient = require("mongodb").MongoClient;
//imports cors middleware allowing api access
const cors = require("cors");
//imports express framework for web app
const express = require("express");

//defines connection string for mongodb,
//local mongodb instance run on default port 27017
const conString = "mongodb://127.0.0.1:27017";

//initialize express app
const app = express();
//enables cors for all routes
app.use(cors());
//parse incoming request with url encoded payload
//for html form submission extended for rich obj,array encoding
app.use(express.urlencoded({extended:true}));
//parse incoming request with json payload
app.use(express.json());


//API ENDPOINTS

app.get('/users/:userid', (req, res)=>{
    mongoClient.connect(conString).then(clientObj=>{
         var database = clientObj.db("todo");
         database.collection('users').findOne({user_id:req.params.userid}).then(user=>{

                res.send(user);
                res.end();

         })
    });
});

app.get('/appointments/:userid', (req, res)=>{
    mongoClient.connect(conString).then(clientObj=>{
         var database = clientObj.db("todo");
         database.collection('appointments').find({user_id:req.params.userid}).toArray().then(documents=>{
              res.send(documents);
              res.end();
         });
    });
});

app.get('/appointments/:id', (req, res)=>{
    mongoClient.connect(conString).then(clientObj=>{
         var database = clientObj.db("todo");
         database.collection('appointments').findOne({appointment_id:parseInt(req.params.id)}).then(document=>{
            res.send(document);
            res.end();
         });
    });
});

app.post('/register-user', (req, res)=>{

    var user = {
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        password: req.body.password,
        mobile: req.body.mobile
    }

    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("todo");
        database.collection('users').insertOne(user).then(()=>{
              console.log('User Registered');
              res.end();
        });
   });
});

app.post('/add-appointment', (req, res)=>{

    var appointment = {
        appointment_id : parseInt(req.body.appointment_id),
        title: req.body.title, 
        description: req.body.description, 
        date: new Date(req.body.date),
        user_id: req.body.user_id
    };

    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("todo");
        database.collection('appointments').insertOne(appointment).then(()=>{
              console.log('Appointment Added');
              res.end();
        });
   });
});

app.put('/edit-appointment/:id', (req, res)=>{

    var id = parseInt(req.params.id);

    var appointment = {
        appointment_id : parseInt(req.body.appointment_id),
        title: req.body.title, 
        description: req.body.description, 
        date: new Date(req.body.date),
        user_id: req.body.user_id
    };

    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("todo");
        database.collection('appointments').updateOne({appointment_id:id},{$set:appointment})
        .then(()=>{
            console.log('Appointment Updated');
            res.end();
        });
   });
});

app.delete('/delete-appointment/:id', (req, res)=>{
    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObj=>{
        var database = clientObj.db("todo");
        database.collection('appointments').deleteOne({appointment_id:id})
        .then(()=>{
            console.log('Appointment Deleted');
            res.end();
        });
   });
});

//SERVER LISTENING

//starts express server and listen for incoming reuest on 4040
app.listen(4040);
//logs server started and provides url
console.log(`Server Started http://127.0.0.1:4040`);