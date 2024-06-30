const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quotesDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Quote Schema
const quoteSchema = new mongoose.Schema({
    quote: String,
    author: String
});

const Quote = mongoose.model('Quote', quoteSchema);

// API Endpoints
app.get('/api/random-quote', async (req, res) => {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    res.json(quote);
});

app.get('/api/search-quote', async (req, res) => {
    const author = req.query.author;
    const quote = await Quote.findOne({ author: new RegExp(author, 'i') });
    res.json(quote || {});
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
