const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Разрешаем CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Логируем ВСЕ запросы
app.use((req, res, next) => {
    console.log('📨 Получен запрос:', req.method, req.url, new Date().toISOString());
    next();
});

// API endpoints
app.post('/api/button1', (req, res) => {
    console.log('🔵 Кнопка 1 нажата!');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    res.json({ 
        message: 'Кнопка 1 работает на Render!',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

app.post('/api/button2', (req, res) => {
    console.log('🔴 Кнопка 2 нажата!');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    res.json({ 
        message: 'Кнопка 2 работает на Render!',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

// Health check
app.get('/api/health', (req, res) => {
    console.log('❤️ Health check requested');
    res.json({ 
        status: 'OK', 
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Fallback для SPA
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('❌ Ошибка:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`⏰ Время запуска: ${new Date().toISOString()}`);
    console.log(`🌐 Доступен по: https://my-webapp-plg5.onrender.com`);
});
