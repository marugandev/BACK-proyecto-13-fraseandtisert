const validatePatternPassword = (passw) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(passw);
};

module.exports = validatePatternPassword;
