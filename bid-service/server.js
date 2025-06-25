const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/auction');

const Bid = mongoose.model('Bid', new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    auctionId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    timestamp: { type: Date, default: Date.now }
}));

app.post('/bids', async (req, res) => {
    const { userId, auctionId, amount } = req.body;
    const bid = new Bid({ userId, auctionId, amount });
    await bid.save();
    res.status(201).json(bid);
});

app.get('/bids/auction/:auctionId', async (req, res) => {
    const bids = await Bid.find({ auctionId: req.params.auctionId });
    res.json(bids);
});

app.listen(5000, () => console.log('Bid Service running on port 5000'));
