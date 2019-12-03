import bcrypt from 'bcrypt';

class Hash {
  static async hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }

  static async match(pass1, pass2) {
    const match = await bcrypt.compare(pass1, pass2);
    return match;
  }
}

export default Hash;