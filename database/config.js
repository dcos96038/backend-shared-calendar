const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Online');
  } catch (err) {
    console.log(err);
    throw new Error('Error initializating DB');
  }
};

module.exports = {
  dbConnection,
};
