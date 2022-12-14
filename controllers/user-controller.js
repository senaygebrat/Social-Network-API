const { User, Thought } = require("../models");

module.exports = {
  //get all users, /api/users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

// get a single user, /api/user/:userid
getSingleUser(req, res) {
  User.findOne({ _id: req.params.userId })
  .select('-__v')
  .populate({ 
    path: 'thoughts',
    select: '-__v',
  })
  .populate({
    path: 'friends',
    select: '-__v'
  })
  .then((user) =>
  !user
    ? res.status(404).json({ message: 'No user with that ID' })
    : res.json(user)
  )
  .catch((err) => res.status(500).json(err))
},

//create a user, /api/users
createUser(req, res) {
  User.create(req.body)
  .then((user) => res.json(user))
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)});
},

//update user by id, /api/users/:userid
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) => {
          if(!user){        
            res.status(404).json({ message: 'No user with this id!' })
          }
          else{res.json(user)
          }
})
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

// delete a user, /api/users/:userid
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
  .then((user) => {
  if(!user){
    res.status(404).json({ message: 'No user with that ID' })
  return
  }
  return Thought.deleteMany({  //bonus option to delete associated thought
    _id: { $in: user.thoughts }
  })

  })
.then(() => res.status(200).json({ message: 'User deleted!' }))
.catch((err) => res.status(500).json(err));
},

//add a friend route
addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: {friends: req.params.friendId} },
    { runValidators: true, new: true },
    )
    .then((user) => {
          if(!user){        
            res.status(404).json({ message: 'No user with this id!' })
          }
          else{res.json(user)
          }
})
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

//delete a friend
deleteFriend(req, res) {
  User.findOneAndUpdate(
  { _id: req.params.userId },
  { $pull: {friends: req.params.friendId} },
  { runValidators: true, new: true },
  )
  .then((user) => {
    if(!user){        
      res.status(404).json({ message: 'No user with this id!' })
    }
    else{res.json(user)
    }
})
  .catch((err) => { 
  console.log(err);
  res.status(500).json(err);
});
}

};