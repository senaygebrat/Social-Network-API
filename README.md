# Social-Network-API
[Insomnia Preview](./assets/images/social-network.gif)


## Description

This is a back-end program that allows an end user to create users, their thoughts, and reactions to thoughts. Click [here](https://www.youtube.com/watch?v=7iU1KAyvK6c) for a demonstration video!

## Table of Contents

- [Technologies Used](#technologies-used)
- [Code Snippets](#code-snippets)
- [Author](#author)


### Technologies Used
Please click on each link for installation

[MongoDB](https://www.mongodb.com/docs/manual/installation/) 

[Mongoose](https://mongoosejs.com/docs/#)

[Node](https://nodejs.org/en/download/)

[Express](https://expressjs.com/en/starter/installing.html)

[Nodemon](https://www.npmjs.com/package/nodemon)
### Code Snippets

Below is a code snippet showing how when a User is deleted, then all associated thoughts will also be deleted.
```
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
  .then((user) => {
  if(!user){
    res.status(404).json({ message: 'No user with that ID' })
  return
  }
  return Thought.deleteMany({
    _id: { $in: user.thoughts }
  })

  })
.then(() => res.status(200).json({ message: 'User deleted!' }))
.catch((err) => res.status(500).json(err));
},
```

Here is how to add a reaction. First you need to find which thought it applies to and update accordingly.
```
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
```

## Author

If you have any questions about the repository, open an issue or contact me directly at senaygebrat@gmail.com. You can find more of my work at [my Github](https://github.com/senaygebrat?tab=repositories), and further contact information at [LinkedIn](https://linkedin.com/in/senayg).