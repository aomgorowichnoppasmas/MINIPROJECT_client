const bcrypt = require("bcrypt");

let users = {
  users: [
    {
      id: 1,
      username: "admin",
      password: "admin",
      email: "admin@gmail.com",
      name: "admin",
      telephone: "123456789",
    },
  ],
};

let cart = {
  cart: [],
};

const SECRET = "your_jwt_secret";
const NOT_FOUND = -1;

exports.users = users;
exports.cart = cart;
exports.SECRET = SECRET;
exports.NOT_FOUND = NOT_FOUND;

exports.setUsers = function (_users) {
  users = _users;
};

// === validate username/password ===
exports.isValidUser = async (username, password) => {
  const index = users.users.findIndex((item) => item.username === username);
  return await bcrypt.compare(password, users.users[index].password);
};

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
  return users.users.findIndex((item) => item.username === username);
};

exports.checkExistingUidCart = (uid) => {
  return cart.cart.findIndex((item) => item.userid === uid);
};
