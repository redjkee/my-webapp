document.addEventListener('DOMContentLoaded', function() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const result = document.getElementById('result');
    const refreshLogs = document.getElementById('refreshLogs');
    const logsPreview = document.getElementById('logsPreview');

    console.log('✅ Script loaded - buttons found:', btn1, btn2);

    // Функция для отправки запроса
    async function handleButtonClick(buttonNumber) {
        console.log(`🖱️ Button ${buttonNumber} clicked`);
        
        try {
            result.innerHTML = '⏳ Загрузка...';
            
            const response = await fetch(`/api/button${buttonNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    button: buttonNumber,
                    clientTime: new Date().toISOString()
                })
            });

            console.log('📨 Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('📊 Response data:', data);
            
            result.innerHTML = `
                <strong>✅ Успех!</strong><br>
                📝 Сообщение: ${data.message}<br>
                ⏰ Время: ${new Date(data.timestamp).toLocaleString()}<br>
                🆔 ID: ${data.requestId}<br>
                📍 Лог: ${data.serverLog}
            `;
            result.style.backgroundColor = '#d4edda';
            
            // Автоматически обновляем превью логов
            loadLogsPreview();
            
        } catch (error) {
            console.error('❌ Error:', error);
            result.innerHTML = `<strong>❌ Ошибка!</strong><br>${error.message}`;
            result.style.backgroundColor = '#f8d7da';
        }
    }

    // Функция для загрузки превью логов
    async function loadLogsPreview() {
        try {
            const response = await fetch('/api/logs');
            const data = await response.json();
            
            logsPreview.innerHTML = `
                <strong>Последние запросы (${data.totalRequests}):</strong><br>
                ${data.logs.slice(0, 5).map(log => 
                    `<div class="log-item">
                        ${log.method} ${log.url}<br>
                        <small>${new Date(log.timestamp).toLocaleString()}</small>
                    </div>`
                ).join('')}
            `;
        } catch (error) {
            logsPreview.innerHTML = '❌ Не удалось загрузить логи';
        }
    }

    // Обработчики для кнопок
    if (btn1) {
        btn1.addEventListener('click', () => handleButtonClick(1));
        console.log('✅ Button 1 handler attached');
    }
    if (btn2) {
        btn2.addEventListener('click', () => handleButtonClick(2));
        console.log('✅ Button 2 handler attached');
    }

    // Обработчик для кнопки обновления логов
    if (refreshLogs) {
        refreshLogs.addEventListener('click', loadLogsPreview);
    }

    // Загружаем превью логов при старте
    loadLogsPreview();
});
