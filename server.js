const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, err => {
    console.log('Server listening on port %j', PORT);
});

app.use(express.static('./dist'));
