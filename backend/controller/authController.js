const User = require('../model/user');
const bcrypt = require('bcryptjs');

const SignUp = async (req, res) => {
  const { name, email, password, usertype } = req.body;
  //   if (!name || !email || !password || !usertype) {
  //     return res.status(401).json({ error: 'Fill All the Fields of Form' });
  //   }
  try {
    // Email Check
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(200).json({ errror: 'Email already exists' });
    } else {
      const addUser = await new User({ name, email, password, usertype });
      // Hash the Password
      const data = await addUser.save();
      if (data) {
        return res.status(200).json(data);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
const SignIn = async (req, res) => {
  const { email, password } = req.body;
  //   if (!name || !email || !password || !usertype) {
  //     return res.status(401).json({ error: 'Fill All the Fields of Form' });
  //   }
  try {
    // Email Check
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const isMatched = bcrypt.compare(password, userExist.password);
      const token = await userExist.generateAuthToken();
      if (isMatched) {
        res.cookie('jwttoken', token, {
          expires: new Date(Date.now() + 300070),
          httponly: true,
        });
        res.json({ success: 'Successs Login' });
      } else {
        res.json({ success: 'nVlaid Login' });
      }
    } else {
      return res.status(200).json({ errror: 'Email already Not exists' });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { SignUp, SignIn };
