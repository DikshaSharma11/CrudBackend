const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = 3000;

mongoose
  .connect('mongodb+srv://diksha170280411:diksha170280@cluster1.7rmns9c.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});