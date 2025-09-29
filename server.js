const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

// API endpoints с логированием
app.post('/api/button1', (req, res) => {
    console.log('🔵 Кнопка 1 нажата в:', new Date().toISOString());
    res.json({ 
        message: 'Кнопка 1 работает на Render!',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/button2', (req, res) => {
    console.log('🔴 Кнопка 2 нажата в:', new Date().toISOString());
    res.json({ 
        message: 'Кнопка 2 работает на Render!',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
