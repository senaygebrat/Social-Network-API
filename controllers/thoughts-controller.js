const { User, Thought } = require('../models');

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .select('-__v')
    .populate({
      // path: 'thoughts', select: '-__v'
    })
    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)});
},

//get single thought by id



//create a new thought
createThought(req, res) {
  Thought.create(req.body)
  .then((thought) => {
    return User.findOneAndUpdate(
      { username: req.body.username },
      { $push: {thoughts: thought._id}}
      )
  })
  .then(() => res.json({message: "Thought successfully added!"}))
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)});
},


//update thought by id



//delete thought
deleteThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.userId }
  )
}














}