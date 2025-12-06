document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('Этот email уже зарегистрирован');
        return;
    }
    
    // Add new user
    const newUser = {
        name,
        email,
        password,
        registrationDate: new Date().toLocaleDateString('ru-RU')
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Регистрация успешна! Пожалуйста, войдите.');
    window.location.href = 'login.html';
});
