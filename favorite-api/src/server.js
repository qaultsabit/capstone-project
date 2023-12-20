const express = require('express');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();

app.use(express.json());
app.use('/user', favoriteRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
