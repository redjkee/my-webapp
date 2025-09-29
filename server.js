const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Храним последние логи в памяти
let requestLogs = [];

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
    const log = {
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent') || 'Unknown'
    };
    
    requestLogs.unshift(log); // Добавляем в начало
    requestLogs = requestLogs.slice(0, 50); // Храним только последние 50
    
    console.log(`📨 ${log.method} ${log.url} - ${log.timestamp}`);
    next();
});

// API endpoints с улучшенным логированием
app.post('/api/button1', (req, res) => {
    const logMessage = `🔵 КНОПКА 1 НАЖАТА - ${new Date().toISOString()}`;
    console.log('🎯 ' + logMessage);
    console.log('📍 IP:', req.ip);
    console.log('📱 User Agent:', req.get('User-Agent'));
    
    res.json({ 
        message: 'Кнопка 1 работает на Render! 🚀',
        timestamp: new Date().toISOString(),
        status: 'success',
        serverLog: logMessage,
        requestId: Date.now()
    });
});

app.post('/api/button2', (req, res) => {
    const logMessage = `🔴 КНОПКА 2 НАЖАТА - ${new Date().toISOString()}`;
    console.log('🎯 ' + logMessage);
    console.log('📍 IP:', req.ip);
    console.log('📱 User Agent:', req.get('User-Agent'));
    
    res.json({ 
        message: 'Кнопка 2 работает на Render! 🎉',
        timestamp: new Date().toISOString(),
        status: 'success', 
        serverLog: logMessage,
        requestId: Date.now()
    });
});

// Endpoint для просмотра логов через браузер
app.get('/api/logs', (req, res) => {
    res.json({
        serverTime: new Date().toISOString(),
        totalRequests: requestLogs.length,
        logs: requestLogs
    });
});

// Health check
app.get('/api/health', (req, res) => {
    console.log('❤️ Health check requested');
    res.json({ 
        status: 'OK', 
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        requestCount: requestLogs.length
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
    console.log(`📊 Логи доступны по: https://my-webapp-plg5.onrender.com/api/logs`);
});
