const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

app.use(router);

app.use(express.json());
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
