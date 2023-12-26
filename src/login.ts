window.addEventListener('DOMContentLoaded', (event) => {
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
    const usernameInput = document.getElementById('username') as HTMLInputElement;

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            window.location.href = '/game.html?username=' + encodeURIComponent(username);
        } else {
            alert('Please enter a username.');
        }
    });
});
