const mongoose = require('mongoose');
const Dburi = process.env.MONGO_URI;
const dbconnection = mongoose
  .connect(Dburi)
  .then(() => {
    console.log('Connection nSuccesFul');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = dbconnection;
