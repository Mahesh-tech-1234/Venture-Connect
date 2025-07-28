// =======================================================
// 1. IMPORTS & SETUP
// =======================================================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Essential for connecting frontend to backend

const app = express();
const PORT = 3001; // Your backend will run on this port

// =======================================================
// 2. MIDDLEWARE
// =======================================================
app.use(cors()); // Allows your React app (on a different port) to make requests here
app.use(express.json()); // Allows the server to understand JSON data sent from the frontend

// =======================================================
// 3. DATABASE CONNECTION
// =---===================================================
const MONGO_URI = 'mongodb://127.0.0.1:27017/venture_connect_db'; // Your local MongoDB URI

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB: venture_connect_db'))
  .catch((err) => console.error('❌ Database connection error:', err));

// =======================================================
// 4. DATABASE SCHEMAS & MODELS (The structure of your data)
// =======================================================
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // In a real app, you'd hash this!
    role: { type: String, required: true, enum: ['Entrepreneur', 'Venture Capitalist'] }
});
const User = mongoose.model('User', userSchema);

const startupIdeaSchema = new mongoose.Schema({
    idea: { type: String, required: true },
    status: { type: String, required: true, default: 'Pending' },
    entrepreneur: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    },
    reviewedByVC: {
        name: String,
        contact: {
            name: String,
            email: String,
            linkedIn: String
        }
    },
    matches: [{
        vcName: String,
        investmentFocus: String,
        reason: String
    }]
}, { timestamps: true }); // `timestamps` adds createdAt and updatedAt fields
const StartupIdea = mongoose.model('StartupIdea', startupIdeaSchema);


// =======================================================
// 5. API ROUTES (The Endpoints your Frontend calls)
// =======================================================

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }
        const newUser = new User({ name, email: email.toLowerCase(), password, role });
        await newUser.save();

        const { password: _, ...userToReturn } = newUser.toObject();
        res.status(201).json(userToReturn);
    } catch (error) {
        res.status(500).json({ message: 'Server error during signup.', error });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const { password: _, ...userToReturn } = user.toObject();
        res.status(200).json(userToReturn);
    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error });
    }
});

// --- IDEAS ROUTES ---
app.get('/api/ideas', async (req, res) => {
    try {
        const ideas = await StartupIdea.find().sort({ createdAt: -1 }); // Get newest first
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching ideas.', error });
    }
});

app.post('/api/ideas', async (req, res) => {
    try {
        const newIdea = new StartupIdea(req.body);
        await newIdea.save();
        res.status(201).json(newIdea);
    } catch (error) {
        res.status(500).json({ message: 'Server error submitting idea.', error });
    }
});

app.put('/api/ideas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIdea = await StartupIdea.findByIdAndUpdate(id, req.body, { new: true }); // {new: true} returns the updated document
        if (!updatedIdea) {
            return res.status(404).json({ message: 'Idea not found.' });
        }
        res.status(200).json(updatedIdea);
    } catch (error) {
        res.status(500).json({ message: 'Server error updating idea.', error });
    }
});


// =======================================================
// 6. START THE SERVER
// =======================================================
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running and listening on http://localhost:${PORT}`);
});