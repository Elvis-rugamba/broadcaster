const userRegister = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rugamba@gmail.com',
  phoneNumber: '0789279777',
  username: 'rugamba',
  password: 'Rug123',
  password2: 'Rug123',
  type: 'admin',
};

const missingFields = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
};

const invalidEmail = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rugambagmail.com',
  phoneNumber: '0789279777',
  username: 'rugamba',
  password: 'Rug123',
  password2: 'Rug123',
  type: 'admin',
};

const existingEmail = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rugamba@gmail.com',
  phoneNumber: '0789279775',
  username: 'rugamba1',
  password: 'Rug123',
  password2: 'Rug123',
  type: 'admin',
};

const existingUserName = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rugamba1@gmail.com',
  phoneNumber: '0789279778',
  username: 'rugamba',
  password: 'Rug123',
  password2: 'Rug123',
  type: 'admin',
};

const existingPhoneNumber = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rugamba2@gmail.com',
  phoneNumber: '0789279777',
  username: 'rugamba',
  password: 'Rug123',
  password2: 'Rug123',
  type: 'admin',
};

const noConfirmPassword = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rug@gmail.com',
  phoneNumber: '0789556458',
  username: 'rug',
  password: 'Rug123',
  password2: 'Rug12',
  type: 'user',
};

const userLogin = {
  email: 'elvisrugamba@gmail.com',
  password: 'elVis123',
};

export default {
  userRegister,
  missingFields,
  invalidEmail,
  existingEmail,
  existingUserName,
  existingPhoneNumber,
  noConfirmPassword,
  userLogin,
};