let lightToggle = document.getElementsByClassName('toggle-light').item(0)
let darkToggle = document.getElementsByClassName('toggle-dark').item(0)

function darkTheme() {
    document.body.className = 'dark-theme';
    darkToggle.classList.remove('display-none')
    lightToggle.classList.add('display-none')
    localStorage.setItem('theme', 'dark')
}

function lightTheme() {
    document.body.className = 'light-theme';
    darkToggle.classList.add('display-none')
    lightToggle.classList.remove('display-none')
    localStorage.setItem('theme', 'light')
}

document.addEventListener('click', function(e) {
    switch (e.target) {
        case lightToggle:
        case lightToggle.firstElementChild:
            darkTheme()
            break;
        case darkToggle:
        case darkToggle.firstElementChild:
            lightTheme()
            break;
    }
})

document.addEventListener('DOMContentLoaded', function() {
    localStorage.getItem('theme') == "light" ? lightTheme() : darkTheme()
})