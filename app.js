const express = require('express');

const { PORT = 3000} = process.env; // MONGO_URL = 'mongodb://localhost:27017/mestodb'

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
