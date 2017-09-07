const express = require("express")
const router = express.Router()
const models = require("../models");
models.Todos.findOne().then(function(todo){
  // console.log(todo);
})

router.get("/", function (req, res) {
   models.Todos.findAll({ limit: 30, order: [['updatedAt', 'DESC']] }).then(function(todos){
     res.render('index', {
       todos: todos,
      })
   })
})

router.post("/", function (req, res) {
  const todo = models.Todos.build({
    Task: req.body.todo,
  })
  todo.save().then(function(newTodo){
    console.log("hello world");
    res.redirect('/')
  })
  console.log("test");
})

router.post("/completed", function (req, res) {
  models.Todos.destroy({
    where: {
      id: req.body.button
    }
  }).then(function(){
    res.redirect('/')
  })
})

router.post("/edit", function (req, res) {
  models.Todos.update({
    Task: req.body.edit,
  }, {
    where: {
      id: req.body.editButton
    }
  }).then(function(){
    res.redirect('/')
  })
})

router.post("/deleteAll", function (req, res) {
  models.Todos.destroy({
    where: {},
    truncated: true
  }).then(function(){
    res.redirect('/')
  })
})



module.exports = router
