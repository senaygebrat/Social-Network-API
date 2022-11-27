const { User, Thought } = require('../models');

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .select('-__v')

    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},

createThought(req, res) {
  Thought.create(req.body)
  .then((thought) => {
    return User.findOneAndUpdate(
      { username: req.body.username },
      { $push: {thoughts: thought.id}}
      )
  })
  .then(() => res.json({message: "Thought successfully added!"}))
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)});
},














}