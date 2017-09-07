const express = require("express")
const router = express.Router()
const models = require("../models");
models.Todos.findOne().then(function(todo){
  // console.log(todo);
})

router.get("/", function (req, res) {
   models.Todos.findAll().then(function(todos){
     res.render('index', {
       todos: todos,
      })
   })
})

router.post("/", function (req, res) {
  // todos.push(req.body.todo);
  const todo = models.Todos.build({
    Task: req.body.todo,
  })
  todo.save().then(function(newTodo){
    console.log(newTodo.id);
  })
  res.redirect('/')
})

router.post("/completed", function (req, res) {
  models.Todos.destroy({
    where: {
      Task: req.body.button
    }
  }).then(function(){
    res.redirect('/')
  })
})



module.exports = router
