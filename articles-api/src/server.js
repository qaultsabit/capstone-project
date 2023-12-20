const express = require('express');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

app.use('/', articleRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
