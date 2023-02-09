//funtion to load dark mode upon loading of the page
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode")
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem('darkModeValue', 'dark')
        console.log('darkmode')
        document.getElementById('darkModeSwitch').src = './static/images/sun.png'
        document.getElementById('headerLogo').src = './static/images/logo_dark.png'
        document.getElementById('footerLogo').src = './static/images/logo_dark.png'
    } else {
        localStorage.setItem('darkModeValue', 'light')
        console.log('lightmode')
        document.getElementById('darkModeSwitch').src = './static/images/moon.png'
        document.getElementById('headerLogo').src = './static/images/logo.png'
        document.getElementById('footerLogo').src = './static/images/logo.png'
    }

}

//funtion to load dark mode upon loading of the page
function loadPage() {
    var modeValue = localStorage.getItem('darkModeValue')
    if (modeValue !== null) {
        if (modeValue.includes("dark")) {
            document.body.classList.toggle("dark-mode")
            document.getElementById('darkModeSwitch').src = './static/images/sun.png'
            document.getElementById('headerLogo').src = './static/images/logo_dark.png'
            document.getElementById('footerLogo').src = './static/images/logo_dark.png'
        } else {
            document.getElementById('darkModeSwitch').src = './static/images/moon.png'
            document.getElementById('headerLogo').src = './static/images/logo.png'
            document.getElementById('footerLogo').src = './static/images/logo.png'
        }
    }
}
