const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require ('path');
const passport = require('passport')

const port = process.env.PORT || 7300;

const authRoutes = require('./routes/api/auth');

 //DB congiguration
const dbkeys = require("./config/keys").mongoURI;

mongoose
    .connect(
        dbkeys,
        { useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    )
    .then(() => console.log("mongoDB connected successfully"))
    .catch(err => console.log(err)
    )


 //app
 const app = express();


app.use(
    bodyParser.urlencoded({
        extended: false
    })

);

app.use(bodyParser.json());
app.use(cors());

    
app.use(express.static(path.join(__dirname,'build')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'build/index.html'))
});

app.use(passport.initialize());
require('./config/passport')(passport);

//routes middleware
app.use('/api', authRoutes);
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});