const express  = require('express'); 
const mongoose = require('mongoose')

const { MONGODB_URL } = require('./Config/db')

const userRouter = require('./Src/Controllers/user.controller');
const eventRouter = require('./Src/Controllers/events.Controller');
const bodyParser = require('body-parser');
cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect db
const port = process.env.PORT || 8000;

app.get('/', (req, res)=>{
    res.status(200).send({message: "Hello"});
})
app.use('/customer',userRouter);
app.use('/event',eventRouter);


mongoose.connect(MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running port on ${port}`)
    });
})
.catch((err)=>{
    console.error("Database Connection failed: " + err.message);
})


