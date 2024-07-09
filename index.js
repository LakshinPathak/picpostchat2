const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '100mb' }));


// Session management
app.use(session({
    secret: 'pathak@123', // Replace with your actual secret key
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());



app.use(flash());

// app.use((req, res, next) => {
//     // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//     res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//     next();
// });


const uri = "mongodb+srv://lakshinpathak2810:nirma123@cluster0.r7ltlis.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Importing routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const profileRoutes = require('./routes/profile');
const chatRoutes =require('./routes/message_chat');

// Using routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/message_chat', chatRoutes);

// Serving HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/feed.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feed.html'));
});

app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'post.html'));
});

app.get('/setting.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'setting.html'));
});


app.get('/bio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bio.html'));
});

app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/create_admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'create_admin.html'));
});


app.get('/message.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'message.html'));
});


app.get('/followers_following.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'followers_following.html'));
});


app.get('/bookmark.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bookmark.html'));
});

app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});
