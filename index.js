const path = require('path');
require('dotenv').config({path:__dirname+'/.env'});
const express = require('express');
// const { join } = require('path');
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
// const logger = require('./middleware/logger');
const members = require('./Members');
const app = express()
const port = process.env.PORT || 3000;
console.log(process.env.DATABASE_URI);



 
// database connection
mongoose.connect(process.env.DATABASE_URI,{useNewParser: true, useUnifiedTopology: true,useNewUrlParser: true });
const db = mongoose.connection;
// db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the database!"));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// h
// app.get('/',(req,res) => res.render('index',{
//     title: 'MY NAME IS SAJJAD',members
// }))
// app.get('/',(req,res) => {
//     res.sendFile(path.join(__dirname,'public','index.html'));
// })
app.use(express.static("./routes/api/uploads"))

app.use('',require('./routes/api/members'))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})