document.addEventListener('DOMContentLoaded', function() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const result = document.getElementById('result');

    // Функция для отправки запроса
    async function handleButtonClick(buttonNumber) {
        try {
            result.innerHTML = 'Загрузка...';
            
            const response = await fetch(`/api/button${buttonNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            result.innerHTML = `
                <strong>Успех!</strong><br>
                Сообщение: ${data.message}<br>
                Время: ${new Date(data.timestamp).toLocaleString()}<br>
                ${data.data ? `Данные: ${JSON.stringify(data.data)}` : ''}
            `;
            result.style.backgroundColor = '#d4edda';
            
        } catch (error) {
            result.innerHTML = `<strong>Ошибка!</strong><br>Не удалось выполнить запрос`;
            result.style.backgroundColor = '#f8d7da';
            console.error('Error:', error);
        }
    }

    // Обработчики для кнопок
    btn1.addEventListener('click', () => handleButtonClick(1));
    btn2.addEventListener('click', () => handleButtonClick(2));
});
