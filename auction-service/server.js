const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auction');

const Auction = mongoose.model('Auction', new mongoose.Schema({
    title: String,
    description: String,
    startingPrice: Number,
    currentPrice: Number,
    status: { type: String, enum: ['pending', 'live', 'ended'], default: 'pending' },
    endsAt: Date,
    ownerId: mongoose.Schema.Types.ObjectId
}));

app.post('/auctions', async (req, res) => {
    const { title, description, startingPrice, endsAt, ownerId } = req.body;
    const auction = new Auction({ title, description, startingPrice, currentPrice: startingPrice, endsAt, ownerId });
    await auction.save();
    res.status(201).json(auction);
});

app.get('/auctions', async (req, res) => {
    const auctions = await Auction.find();
    res.json(auctions);
});

app.listen(4000, () => console.log('Auction Service running on port 4000'));
