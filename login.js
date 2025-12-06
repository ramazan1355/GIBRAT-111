document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user exists
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email,
            registrationDate: user.registrationDate
        }));
        window.location.href = 'index.html';
    } else {
        alert('Неверный email или пароль');
    }
});
