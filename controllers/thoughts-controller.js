const { User, Thought } = require('../models');

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
  }
}