/**
 * API
 */

function registerUser() {
    //...

    let userData = {
        id: 1,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    if (getUser(userData.username) === true) {
        fetch('../data/db.json', {
            method: 'post',
            body: JSON.stringify({
                id: userData.id,
                username: userData.username,
                email: userData.email,
                password: userData.password
            })
        })
    }


}

function getUser(username) {
    fetch('../data/db.json')
        .then(r => r.json())
        .then(data => {
            const element = data.find(item => item.username === username);
            return element == null;
    });
}