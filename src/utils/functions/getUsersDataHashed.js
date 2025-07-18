const validatePatternPassword = require("./validatePatternPassword");
const hashPassword = require("./hashPassword");

const getUsersDataHashed = async (users) => {
  const hashedUsers = [];

  for (let user of users) {
    if (!validatePatternPassword(user.password))
      throw new Error(
        `La contraseña de ${user.email} no es válida. Mínimo 8 caracteres, al menos una letra y un número`
      );

    const hashedPassword = await hashPassword(user.password);

    hashedUsers.push({ ...user, password: hashedPassword });
  }

  return hashedUsers;
};

module.exports = getUsersDataHashed;
