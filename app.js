const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// console.log(date);
// console.log(express);

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');  // telling express that out of many templates modules use ejs.
// we need to create 'views' directory for using any view engine (here ejs);
// res.render() uses the view engine(views folder) to render particular page.

app.use(express.static("public"));

// const keyword in js - see mdn reference.
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get("/", function(req, res){
    const day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
})


app.post("/", function(req, res){

    const item = req.body.newItem;
    
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})


app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

// app.post("/work", function(req, res){
//     let item = req.body.newItem;
    
// })

app.get("/about", function(req, res){
    res.render("about");
})


app.listen(port, function(){
    console.log("Server is running on port 3000");
})




