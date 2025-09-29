const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Простейший сервер для диагностики
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'DIAGNOSTIC OK', 
        time: new Date().toISOString(),
        message: 'Server is responding'
    });
});

app.post('/api/button1', (req, res) => {
    console.log('BUTTON 1 PRESSED');
    res.json({ message: 'Button 1 works!' });
});

app.post('/api/button2', (req, res) => {
    console.log('BUTTON 2 PRESSED'); 
    res.json({ message: 'Button 2 works!' });
});

// Статические файлы ДОЛЖНЫ быть последними
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('🔧 Diagnostic server running on port', PORT);
});
