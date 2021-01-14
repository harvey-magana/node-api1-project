const User = require('./db_model.js');

const express = require('express');

const server = express();

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})



module.exports = server;