const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log('Request:', req.method, req.url);
    
    if (req.url === '/') {
        // Отдаем HTML
        const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
    else if (req.url === '/style.css') {
        // Отдаем CSS
        const css = fs.readFileSync(path.join(__dirname, 'public', 'style.css'));
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(css);
    }
    else if (req.url === '/script.js') {
        // Отдаем JS
        const js = fs.readFileSync(path.join(__dirname, 'public', 'script.js'));
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(js);
    }
    else if (req.url === '/api/button1' && req.method === 'POST') {
        // API endpoint
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Кнопка 1 работает!'}));
    }
    else if (req.url === '/api/button2' && req.method === 'POST') {
        // API endpoint
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Кнопка 2 работает!'}));
    }
    else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(5000, () => {
    console.log('✅ Минимальный сервер работает: http://localhost:5000');
});
