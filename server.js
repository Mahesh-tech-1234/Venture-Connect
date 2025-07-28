import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 3000;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

app.use(cors());
app.use(express.json());

client.connect().then(() => {
  db = client.db('ventureConnect');
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB', err);
});

app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword, role };

    await db.collection('users').insertOne(user);

    delete user.password;
    res.status(201).json(user);
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
