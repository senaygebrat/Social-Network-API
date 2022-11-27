const { User, Thought } = require('../models');

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .select('-__v')

    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)});
},

//get single thought by id
getSingleThought(req, res){
  Thought.findOne({ _id: req.params.thoughtId })
  .select('-__v')
  .then((thought) =>
  !thought
    ? res.status(404).json({ message: 'No thought with that ID' })
    : res.json(thought)
  )
  .catch((err) => res.status(500).json(err))
},



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
updateThought(req, res){
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
  .then((thought) => {
    if(!thought){        
      res.status(404).json({ message: 'No thought with this id!' })
    }
    else{res.json(thought)
    }
})
.catch((err) => {
console.log(err);
res.status(500).json(err);
});
},


//delete thought
deleteThought(req, res) {
  Thought.findOneAndDelete(
    { _id: req.params.thoughtId }
  )
  .then((user) => {
    if(!user){
      res.status(404).json({ message: 'No thought with that ID' })}
    })
  .then(() => res.json({ message: 'Thought deleted!' }))
  .catch((err) => res.status(500).json(err));
},

//2 more routes for reactions

addReaction(req, res){
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: {reactions: req.body} },
    { runValidators: true, new: true },
  )
  .then((thought) => {
    if(!thought){        
      res.status(404).json({ message: 'No thought with this id!' })
    }
    else{res.json(thought)
    }
})
  .catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
},

deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
  { $pull: {reactions: req.params.thoughtId} },
  { runValidators: true, new: true },
  )
  .then((thought) => {
    if(!thought){        
      res.status(404).json({ message: 'No thought with this id!' })
    }
    else{res.json(thought)
    }
})
  .catch((err) => { 
  console.log(err);
  res.status(500).json(err);
});
}

};