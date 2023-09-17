const nosqlDB = require('./mongodb/mongodb');
const sqlDB = require('./mysql/mysql');

async function initializeDatabases() {
  try {
    // Initialize MySQL database
    await sqlDB.sequelize.sync();
    console.log('MySQL database initialized successfully')

    // Initialize MongoDB database
    await nosqlDB.connectToMongoDB();
    console.log('MongoDB database initialized successfully')
  } catch (error) {
    console.error('Error initializing databases:', error)
  }
}

module.exports = { initializeDatabases }