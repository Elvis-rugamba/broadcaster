const userRegister = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rugamba@gmail.com',
  phoneNumber: '0789279777',
  username: 'rugamba',
  password: 'Rug123',
  password2: 'Rug123',
  type: 'user',
};

const user = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'elvis@gmail.com',
  phoneNumber: '0789279770',
  username: 'elvis',
  password: '$2b$10$1HW2vhFMWXXrj9/DWymAtONjNRvcsU9Pp7fxdx1NYkTCloS0iyOpy',
  type: 'user',
};

const admin = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'elvisrugamba@gmail.com',
  phoneNumber: '0789279774',
  username: 'elvis-rugamba',
  password: '$2b$10$61MrELSTJ9YzrSFYltRa2uwvsRZlGVySxwfo/qduRIfZf6kvS2Tgi',
  type: 'admin',
};

const missingFields = {};

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

const fieldSize = {
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rug@gmail.com',
  phoneNumber: '078955645807895564580789556458',
  username: 'rug',
  password: 'Rug123',
  password2: 'Rug123',
  type: 'user',
};

const userLogin = {
  email: 'rugamba@gmail.com',
  password: 'Rug123',
};

const userLogin2 = {
  email: 'elvis@gmail.com',
  password: 'Rug123',
};

const adminLogin = {
  email: 'elvisrugamba@gmail.com',
  password: 'elVis123',
};

const invalidLogin = {
  email: 'el@gmail.com',
  password: 'elVis123',
};

const payload = {
  id: 2,
  firstname: 'Elvis',
  lastname: 'Rugamba',
  email: 'rugamba@gmail.com',
  phoneNumber: '0789279777',
  username: 'rugamba',
  password: 'Rug123',
  password2: 'Rug123',
  type: 'user',
};

export default {
  userRegister,
  user,
  missingFields,
  invalidEmail,
  existingEmail,
  existingUserName,
  existingPhoneNumber,
  noConfirmPassword,
  fieldSize,
  userLogin,
  invalidLogin,
  payload,
  admin,
  adminLogin,
  userLogin2,
};