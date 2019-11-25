const express =require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const MongoClient = require('mongodb').MongoClient;


require('dotenv').config();

const app =express();
const port = process.env.PORT || 5000;

//middelware
app.use (cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;


/*Using MongoClient IT seems to work but trying to use insomnia to post seems not working */

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(()=> {

//      console.log("MongoDB database connection established successfully");
     
//      const collection = client.db("test").collection("devices");
  
// });

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, () => { console.log("MongoDB database connection established successfully")})
.catch(err=>console.log(err));


// const db = mongoose.connection;
// db.once('open', ()=>{
//     console.log("MongoDB database connection established successfully");
    
// })


const exercisesRouter = require ('./routes/exercises')
const usersRouter = require ('./routes/users')
     
     app.use('/exercises', exercisesRouter);
     app.use('/users', usersRouter);



//server listen
app.listen(port, () =>{
    console.log(`Server is running on port : ${port}`);
    
});

