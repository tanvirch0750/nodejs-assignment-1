const utilFunction = require('../utils/save-and-get-user-data.js');

module.exports.createUser = (req, res) => {
  const existUsers = utilFunction.getUserData();
  const newUserId = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);

  const { name, gender, contact, address, photoUrl } = req.body;

  if (
    name === '' ||
    gender === '' ||
    contact === '' ||
    address === '' ||
    photoUrl === ''
  ) {
    return res.send('Plese provide all the credentials');
  }

  const newUser = { id: newUserId, ...req.body };
  const updatedUsers = [...existUsers, newUser];

  utilFunction.saveUserData(updatedUsers);
  return res.send(`user added successfully`);
};

module.exports.getAllUser = (req, res) => {
  const q = req.query.limit;
  const users = utilFunction.getUserData();

  if (q > users.length) {
    return res.send(users);
  }

  if (q) {
    return res.send(users.slice(0, q));
  }

  return res.send(users);
};

module.exports.getSingleUser = (req, res) => {
  const { id } = req.params;
  const existUsers = utilFunction.getUserData();

  const foundUser = existUsers.find((user) => user.id === id);
  if (foundUser) {
    res.send(foundUser);
  } else {
    res.send(`Sorry User not found`);
  }
};

module.exports.getRandomData = (req, res) => {
  const existUsers = utilFunction.getUserData();
  const randomIndex = Math.floor(Math.random() * existUsers.length);
  const randomUser = existUsers[randomIndex];
  res.send(randomUser);
};

module.exports.deleteUserData = (req, res) => {
  const { id } = req.params;
  const existUsers = utilFunction.getUserData();

  const foundUser = existUsers.find((user) => user.id === id);
  if (!foundUser) {
    return res.send(`user with id ${id} does not exist`);
  }

  const remainingUsers = existUsers.filter((user) => user.id !== id);
  utilFunction.saveUserData(remainingUsers);
  return res.send(`users with id ${id} has been deleted`);
};

module.exports.updateUserData = (req, res) => {
  const { id } = req.params;
  const { name, gender, contact, address, photoUrl } = req.body;
  const existUsers = utilFunction.getUserData();

  const foundUser = existUsers.find((user) => user.id === id);

  if (!foundUser) {
    return res.send(`user with id ${id} does not exist`);
  }

  const updatedUsers = existUsers.map((user) => {
    if (user.id === id) {
      if (name) return { ...user, name };
      if (gender) return { ...user, gender };
      if (contact) return { ...user, contact };
      if (address) return { ...user, address };
      if (photoUrl) return { ...user, photoUrl };
    } else {
      return user;
    }
  });

  utilFunction.saveUserData(updatedUsers);
  res.send(`user with id ${id} has been updated`);
};
