const express = require("express");
const mongoose = require("mongoose");
const MyTodoModel = require("./models/Todo");
const app = express();
app.use(express.urlencoded({ extended: true })); //without it the data will be undefind

mongoose
  .connect(
    "mongodb+srv://Mahmoud:123@cluster0.ncnppey.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    console.log("connect successfully to this DB");
    app.listen(3000, () => {
      console.log("Lisning to Port 3000");
    });
  })
  .catch((err) => {
    console.log(`problem in connection ${err}`);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));

//to send and save todos in database
app.post("/", (req, res) => {
  console.log(req.body);
  const todoDB = new MyTodoModel(req.body);
  todoDB
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(`Save error: ${err}`);
    });
});

//to show the data in my html page / DOM

app.get("/", (req, res) => {
  MyTodoModel.find()
    .then((result) => {
      res.render("index", {
        arr: result,
      });
    })
    .catch((err) => {
      console.log(`Problem fetching data: ${err}`);
    });
});

// to delete task 

app.post("/delete/:id",(req,res)=>{
    const id = req.params.id;
    MyTodoModel.findByIdAndDelete(id)
        .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
})

// to edit task

app.get("/edit/:id",(req,res)=>{
    const id = req.params.id;
    MyTodoModel.findById(id)//Finds the document in MongoDB / retrieve one document by its _id
       .then((task) => {
      res.render("edit", { task });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  /*
this line extracts a value from the URL in an Express (Node.js) application.
req.params is an object that holds route parameters.
Route parameters come from dynamic parts of the URL.
  */

  MyTodoModel.findByIdAndUpdate(id, {
    task: req.body.task,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});