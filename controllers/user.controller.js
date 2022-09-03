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
    typeof contact !== 'number' ||
    address === '' ||
    photoUrl === ''
  ) {
    return res.send('Plese provide all valid credentials');
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
      if (name || gender || contact || address || photoUrl) {
        return {
          id: user.id,
          name: name || user.name,
          gender: gender || user.gender,
          contact: contact || user.contact,
          address: address || user.address,
          photoUrl: photoUrl || user.photoUrl,
        };
      }
    } else {
      return user;
    }
  });

  utilFunction.saveUserData(updatedUsers);
  res.send(`user with id ${id} has been updated`);
};

module.exports.bulkUpdate = (req, res) => {
  const ids = req.body;
  const existUsers = utilFunction.getUserData();
  const key = 'id';
  const updatedBulkUsers = existUsers.map((user) => {
    const foundUser = ids.find((i) => i[key] === user[key]);

    if (foundUser) {
      user = Object.assign(user, foundUser);
    }
    return user;
  });

  utilFunction.saveUserData(updatedBulkUsers);
  res.send(`Bulk Update successfull`);
};
