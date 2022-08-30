/* npx kill-port 8080 to kill a port */

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//all mongodb content
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
    // console.log("we  are connected now");
}
// now we make a schema
const contactSchema = new mongoose.Schema({
    namee: String,
    age: Number,
    phone: String,
    email: String,
    Address: String
})

// now our schema is locked and converted into a model. model is compiled schema
const contact = mongoose.model('Contact', contactSchema);

//-------------------------------------------------------------
// for pug use we now do:
// app.use('/static', express.static('static'));   not works anymore image in render kra tha neche wala works fie 
// app.use('/static', express.static('static'));   // pehla static  url dusra static folder ka name hai
app.use("/static", express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }))
//set the template enginer pug
app.set('view engine', 'pug');
// now set the views directory
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    //res.status(200).render('index.pug');   //now we using the template thing and using home instead of index
    res.status(200).render('home.pug');
})
// for contact form

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})
// after mongodb
app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        // alert("your data has been saved");
        res.send("this item has been saved to the data base")

    }).catch(() => {
        res.status(400).send("item wasnt saved")
    })
    // res.status(200).render('contact.pug');
})


const port = 80;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
    console.log(`application has started at  http://${hostname}:${port}/`);
})