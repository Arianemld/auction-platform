const express = require('express');
const jwt = require('jwt-simple');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const secretKey = 'your_secret_key';

function validateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Token is required');
    }
    try {
        const decoded = jwt.decode(token.split(' ')[1], secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
}

app.post('/login', (req, res) => {
    const { email } = req.body;
    const payload = { userId: 1, email };
    const token = jwt.encode(payload, secretKey);
    res.json({ token });
});

app.use(validateToken);

app.get('/profile', (req, res) => {
    res.json({ message: `Hello ${req.user.email}` });
});

app.listen(5000, () => console.log('Auth Gateway running on port 5000'));
