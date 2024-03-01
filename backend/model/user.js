const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
// to Generate the token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = await jwt.sign({ _id: this._id }, 'myname');
    this.token = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
userSchema.pre('save', async function (next) {
  if (this.isModified(this.password)) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
