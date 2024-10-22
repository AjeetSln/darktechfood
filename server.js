const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const MenuRoutes = require('./routes/menuRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const Admin = require('./models/Admin_1'); 
const Order = require('./models/orderModel'); // Ensure the path is correct
const dbconfig = require('./db'); // Database configuration

const app = express();  
const port = 3000;  

// Connect to the MongoDB database
dbconfig(); 

// Middleware
app.use(cors());
app.use(express.json());

// Use the MenuRoutes for any requests to /api/menu
app.use('/api/menu', MenuRoutes);

// Admin login route
app.post('/admin', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await Admin.findOne({ email });
      if (user) {
          if (user.password === password) {
              return res.json("Success");
          } else {
              return res.json("Incorrect password");
          }
      } else {
          return res.json("No record found");
      }
  } catch (error) {
      console.error('Admin login error:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Use order routes for /api/orders
app.use('/api/orders', orderRoutes);


// Default route to check if the server is running
app.get('/test', (req, res) => {
  res.send('Test route works');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
