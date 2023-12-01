const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const recyclingRoutes = require('./routes/recyclingRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', recyclingRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
