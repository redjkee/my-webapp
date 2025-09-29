const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Храним логи в памяти
let requestLogs = [];

// Middleware
app.use(express.json());

// Логируем все запросы
app.use((req, res, next) => {
    const log = {
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString(),
        ip: req.ip
    };
    requestLogs.unshift(log);
    requestLogs = requestLogs.slice(0, 50);
    console.log(`📨 ${log.method} ${log.url} - ${log.timestamp}`);
    next();
});

// API endpoints
app.post('/api/button1', (req, res) => {
    console.log('🔵 КНОПКА 1 НАЖАТА!');
    res.json({ 
        message: 'Кнопка 1 работает! 🚀',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

app.post('/api/button2', (req, res) => {
    console.log('🔴 КНОПКА 2 НАЖАТА!');
    res.json({ 
        message: 'Кнопка 2 работает! 🎉',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

// Endpoint для логов
app.get('/api/logs', (req, res) => {
    res.json({
        serverTime: new Date().toISOString(),
        totalRequests: requestLogs.length,
        logs: requestLogs
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        time: new Date().toISOString(),
        requestCount: requestLogs.length
    });
});

// Статические файлы ПОСЛЕДНИМИ
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('🚀 Server running on port', PORT);
});
