const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для статических файлов
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API эндпоинты
app.post('/api/button1', (req, res) => {
  console.log('Button 1 pressed');
  res.json({ 
    message: 'Кнопка 1 нажата!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

app.post('/api/button2', (req, res) => {
  console.log('Button 2 pressed');
  res.json({ 
    message: 'Кнопка 2 активирована!',
    timestamp: new Date().toISOString(),
    data: { action: 'special_action' }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', version: '1.0.0' });
});

// Главная страница - ДОЛЖНА БЫТЬ ПОСЛЕДНЕЙ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler - ИСПРАВЛЕННЫЙ ВАРИАНТ
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
