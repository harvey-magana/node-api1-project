const User = require('./db_model.js');

const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: "hellow world!" });
})

server.post('/api/users', async(req, res) => {
    const user = req.body;

    if(!user.name || !user.bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    } else {
        
        try{
            const newlyCreatedUser = await User.create(user);
            res.status(200).json(newlyCreatedUser);
        } catch(err) {
            res.status(500).json({
                error: err.message
            })
        }
    }
})

server.get('/api/users', async (req, res) => {
    console.log(res)
    try {
        const users = await User.findAll();
        res.status(200).json(users)
        console.log(res)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

server.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    try{
        const user = await User.findById(id)
        if(user) {
            res.status(200).json(user)
        } else{
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    } catch(err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved."})
    }
})

server.delete('/api/users/:id', async(req, res) => {
    const {id} = req.params;

    try{
        const user = await User.delete(id);

        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    } catch(err) {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})

server.put('/api/users/:id', async(req, res) => {
    const {id} = req.params;
    const changes = req.body;

    if (!changes.name || !changes.bio) {
        return res
          .status(400)
          .json({ errorMessage: 'Please provide name and bio for the user' });
      }
    
      const user = await User.findById(id);
    
      if (!user) {
        return res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    
      const updated = await User.update(id, changes);
    
      if (!updated) {
        return res
          .status(500)
          .json({ error: 'The user information could not be modified' });
      }
    
      const updatedUser = await User.findById(id);
      return res.status(200).json(updatedUser);
})

module.exports = server;