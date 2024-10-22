
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin_1'); // Use require() instead of import

// MongoDB connection URL
const MONGO_URI = 'mongodb+srv://Ajeet7668:Ajeet%407668@cluster0.xvt36.mongodb.net/TableServeFood1?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit with failure code
    }
};

// Export the connection function
module.exports = connectDB;


