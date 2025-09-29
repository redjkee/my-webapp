const express = require('express');
const app = express();
const PORT = 5000;

// Статические файлы
app.use(express.static('public'));

// API endpoints
app.post('/api/button1', (req, res) => {
    res.json({ 
        message: 'Кнопка 1 нажата! ✅',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/button2', (req, res) => {
    res.json({ 
        message: 'Кнопка 2 активирована! 🎉', 
        timestamp: new Date().toISOString(),
        data: { action: 'special' }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Веб-приложение запущено: http://localhost:${PORT}`);
});
