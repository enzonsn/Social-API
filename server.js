const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.port || 27017;

app.use(express.json());
app.use(express.urlencoded({exntended: true}));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost, PORT: ${PORT}`));