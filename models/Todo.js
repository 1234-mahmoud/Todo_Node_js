const mongoose=require("mongoose")
const Schema = mongoose.Schema;
const todoTask = new Schema({
    task:String
})

const MyTodoModel = mongoose.model("todolist",todoTask)

module.exports = MyTodoModel