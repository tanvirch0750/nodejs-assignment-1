const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.route.js');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoutes);

app.get('/', (req, res) => res.send('Home Page'));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
