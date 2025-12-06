// Check login on page load
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
    } else {
        loadTabContent();
    }
});

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    loadTabContent(tabName);
}

function loadTabContent(tabName) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (tabName === 'profile' || !tabName) {
        loadProfile();
    } else if (tabName === 'courses') {
        loadCourses();
    } else if (tabName === 'lessons') {
        loadLessons();
    } else if (tabName === 'rating') {
        loadRating();
    } else if (tabName === 'chat') {
        loadChat();
    }
}

function loadProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('profile').innerHTML = `
        <div class="profile-container">
            <h2>Мой Профиль</h2>
            <div class="profile-card">
                <p><strong>Имя:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Дата регистрации:</strong> ${user.registrationDate}</p>
            </div>
            
            <h3>AI Наставник</h3>
            <div class="mentor-section">
                <img src="avatar.jpeg" alt="Аватар ментора" class="mentor-avatar">
                <h2 class="mentor-name">AI Professor</h2>
            </div>
        </div>
    `;
}

function loadCourses() {
    document.getElementById('courses').innerHTML = `
        <div class="courses-container">
            <h2>Доступные курсы</h2>
            <div class="courses-grid">
                <div class="course-card">
                    <h3>Физика</h3>
                    <p>Основы механики, термодинамики и электричества</p>
                </div>
                <div class="course-card">
                    <h3>Математика</h3>
                    <p>Алгебра, геометрия и анализ</p>
                </div>
                <div class="course-card">
                    <h3>Химия</h3>
                    <p>Органическая и неорганическая химия</p>
                </div>
                <div class="course-card">
                    <h3>Биология</h3>
                    <p>Клеточная биология и генетика</p>
                </div>
            </div>
        </div>
    `;
}

function loadLessons() {
    document.getElementById('lessons').innerHTML = `
        <div class="lessons-container">
            <h2>Мини-тесты по физике</h2>
            <div class="lessons-grid">
                <div class="lesson-card">
                    <h3>Механика</h3>
                    <button class="test-btn" onclick="startTest(1)">Пройти тест</button>
                </div>
                <div class="lesson-card">
                    <h3>Термодинамика</h3>
                    <button class="test-btn" onclick="startTest(2)">Пройти тест</button>
                </div>
                <div class="lesson-card">
                    <h3>Электричество</h3>
                    <button class="test-btn" onclick="startTest(3)">Пройти тест</button>
                </div>
                <div class="lesson-card">
                    <h3>Оптика</h3>
                    <button class="test-btn" onclick="startTest(4)">Пройти тест</button>
                </div>
            </div>
        </div>
        
        <div id="test-modal" class="modal" style="display:none;">
            <div class="modal-content">
                <span class="close" onclick="closeTest()">&times;</span>
                <div id="test-body"></div>
            </div>
        </div>
    `;
    
    // Add test data and functions
    window.tests = {
        1: {
            title: 'Механика',
            questions: [
                { q: 'Чему равно ускорение свободного падения?', a: '9.8 м/с²' },
                { q: 'Второй закон Ньютона формулируется как...', a: 'F = ma' }
            ]
        },
        2: {
            title: 'Термодинамика',
            questions: [
                { q: 'Первый закон термодинамики гласит...', a: 'dU = δQ - δW' },
                { q: 'Абсолютный ноль по Цельсию равен...', a: '-273.15°C' }
            ]
        },
        3: {
            title: 'Электричество',
            questions: [
                { q: 'Закон Ома гласит...', a: 'I = U/R' },
                { q: 'Элементарный заряд равен...', a: '1.6 × 10⁻¹⁹ Кл' }
            ]
        },
        4: {
            title: 'Оптика',
            questions: [
                { q: 'Скорость света в вакууме...', a: '3 × 10⁸ м/с' },
                { q: 'Закон преломления света (закон Снеллиуса)...', a: 'n₁sinθ₁ = n₂sinθ₂' }
            ]
        }
    };
}

function startTest(testNum) {
    const test = window.tests[testNum];
    let html = `<h2>${test.title}</h2>`;
    
    test.questions.forEach((item, index) => {
        html += `
            <div class="question">
                <p><strong>Вопрос ${index + 1}:</strong> ${item.q}</p>
                <p><strong>Ответ:</strong> ${item.a}</p>
            </div>
        `;
    });
    
    document.getElementById('test-body').innerHTML = html;
    document.getElementById('test-modal').style.display = 'block';
}

function closeTest() {
    document.getElementById('test-modal').style.display = 'none';
}

function loadRating() {
    document.getElementById('rating').innerHTML = `
        <div class="rating-container">
            <h2>Рейтинг студентов</h2>
            <div class="rating-table">
                <div class="rating-item">
                    <span class="rank">1</span>
                    <span class="name">Алиса Петрова</span>
                    <span class="score">950 баллов</span>
                </div>
                <div class="rating-item">
                    <span class="rank">2</span>
                    <span class="name">Борис Иванов</span>
                    <span class="score">920 баллов</span>
                </div>
                <div class="rating-item">
                    <span class="rank">3</span>
                    <span class="name">Виктория Смирнова</span>
                    <span class="score">890 баллов</span>
                </div>
            </div>
        </div>
    `;
}

function loadChat() {
    document.getElementById('chat').innerHTML = `
        <div class="chat-container">
            <h2>Чат с наставником</h2>
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="message-input" placeholder="Введите сообщение...">
                <button onclick="sendMessage()">Отправить</button>
            </div>
        </div>
    `;
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        const chatBox = document.getElementById('chat-messages');
        chatBox.innerHTML += `<div class="user-message">${message}</div>`;
        chatBox.innerHTML += `<div class="bot-message">Спасибо за сообщение!</div>`;
        input.value = '';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
