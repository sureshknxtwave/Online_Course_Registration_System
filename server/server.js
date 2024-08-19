const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Course = require('./models/Course');
const PurchasedCourse = require('./models/PurchasesCourse')

require("dotenv").config()

const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);


const SECRETE_KEY = "secretkey";

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/OnlineCourseRegistration')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successfully connecting to MongoDB
    app.listen(3005, () => {
      console.log('Server is running on port 3005');
    });
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB:', error);
  });

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:3000"}));

// Routes

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { fullname, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, mobile, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error signing up" });
  }
});

// GET REGISTERED USERS
app.get('/register', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to get users' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }
    const token = jwt.sign({ userId: user._id }, SECRETE_KEY, { expiresIn: '1hr' });
    res.json({ message: 'Login Successful', id: user._id, token: token, Name: user.firstname, Mobile: user.mobile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in logging' });
  }
});

// Admin Logi
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // For demonstration only - hardcoded credentials
    if (username === 'admin' && password === 'admin') {
      res.status(200).json({ message: 'Admin login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to register a new course
app.post('/api/add/courses', async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


// Server-Side: Express API

// Route to fetch all courses
app.get('/api/courses', async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();
    // Send the list of courses as a response
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    // If an error occurs, send an error response
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Server-Side: Express API

// Route to add a new user by admin
app.post('/api/admin/add-user', async (req, res) => {
  try {
    const { fullname, email, mobile, password } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user object
    const newUser = new User({ fullname, email, mobile, password: hashedPassword });
    // Save the new user to the database
    await newUser.save();
    // Send a success response
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    // If an error occurs, send an error response
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Route to fetch all registered users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Server-Side: Express API

// Route to delete a user by ID
app.delete('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Use Mongoose to find and delete the user by ID
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Server-Side: Express API

// Route to delete a course by ID
app.delete('/api/courses/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    // Find the course by ID and delete it from the database
    await Course.findByIdAndDelete(courseId);
    // Send a success message as a response
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    // If an error occurs, send an error response
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Server-side route to handle fetching course details by name
app.get('/api/courses/:courseName', async (req, res) => {
  try {
    const { courseName } = req.params;
    // Fetch all courses with the specified course name from the database
    const courses = await Course.find({ courseName });
    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found with the given name' });
    }
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/checkput', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: 'payment', // Specify the mode parameter
      line_items: req.body.course.map(item => {
        // Ensure item.price is a valid numeric value before proceeding
        const unitAmount = Number(item.price);
        if (isNaN(unitAmount)) {
          throw new Error('Invalid price for the item');
        }
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name
            },
            unit_amount: unitAmount * 100 // Convert to cents
          },
          quantity: 1
        };
      }),
      success_url: "http://localhost:3000/courses/Web%20Development",
      cancel_url: "http://localhost:3000/"
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});




// POST /api/purchased-courses
// Body: { userId, courseId, courseName, price }
app.post('/api/purchased-courses', async (req, res) => {
  try {
    const { userId, courseId, courseName, price } = req.body;
    
    // Create a new instance of the PurchasedCourse model
    const purchasedCourse = new PurchasedCourse({
      userId,
      courseName,
      price
    });

    // Save the purchased course to the database
    const savedPurchasedCourse = await purchasedCourse.save();

    res.json(savedPurchasedCourse);
  } catch (error) {
    console.error('Error storing purchased course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// GET /api/purchased-courses?userId=<userId>
app.get('/api/purchased-courses', async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Find all purchased courses for the specified user ID
    const purchasedCourses = await PurchasedCourse.find({ userId });

    res.json(purchasedCourses);
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// GET /api/my-courses
app.get('/api/my-courses', async (req, res) => {
  try {
    // Extract the user ID from the request (assuming it's stored in req.userId)
    const userId = req.userId;

    // Find all purchased courses for the current user
    const purchasedCourses = await PurchasedCourse.find({ userId });

    res.json(purchasedCourses);
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
