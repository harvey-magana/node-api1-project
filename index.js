const express = require('express');
const PORT = 5000;

const server = express();

server.get('/', (req, res) => {
    res.send('Hello world!');
});

server.listen(PORT, () => {
    console.log(`\n*** server listening on port ${PORT} ***\n`)
})

