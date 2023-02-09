//function to validate form data
function validateForm() {
    loadDarkMode()
    let firstNameError = firstNameValidation();
    let LastNameError = lastNameValidation();
    let emailError = emailValidation();
    let messageError = messageValidation(); 

    if (firstNameError && LastNameError && emailError && messageError) {
        console.log('true')
        alert("Thank you for the Enquiery. We will get back to you soon.");
        return true
    }
    else {
        console.log('false')
        return false
    }
}

//name validation
function firstNameValidation() {
    let text = document.getElementById("fName").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your First Name";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("fNameError").innerHTML = spanMessage;
    return returnValue;
}

//last name validation
function lastNameValidation() {
    let text = document.getElementById("lName").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your Last Name";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("lNameError").innerHTML = spanMessage;
    return returnValue;
}

//email validation
function emailValidation() {
    let text = document.getElementById("email").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your valid Email";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("emailError").innerHTML = spanMessage;
    return returnValue;
}

//message validation
function messageValidation() {
    let text = document.getElementById("message").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your message or enquiery";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("messageError").innerHTML = spanMessage;
    return returnValue;
}

//first name event listner
function firstNameEvent(){
    document.getElementById('fNameError').innerHTML = ""
}

//last name event listner
function lastNameEvent(){
    document.getElementById('lNameError').innerHTML = ""
}

//email event listner
function emailEvent(){
    document.getElementById('emailError').innerHTML = ""
}

//message event listner
function messageEvent(){
    document.getElementById('messageError').innerHTML = ""
}

//funtion to load dark mode upon loading of the page
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode")
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem('darkModeValue', 'dark')
        console.log('darkmode')
        document.getElementById('darkModeSwitch').src = '../static/images/sun.png'
        document.getElementById('headerLogo').src = '../static/images/logo_dark.png'
        document.getElementById('footerLogo').src = '../static/images/logo_dark.png'
    } else {
        localStorage.setItem('darkModeValue', 'light')
        console.log('lightmode')
        document.getElementById('darkModeSwitch').src = '../static/images/moon.png'
        document.getElementById('headerLogo').src = '../static/images/logo.png'
        document.getElementById('footerLogo').src = '../static/images/logo.png'
    }

}

//funtion to load dark mode upon loading of the page
function loadDarkMode() {
    var modeValue = localStorage.getItem('darkModeValue')
    if (modeValue !== null) {
        if (modeValue.includes("dark")) {
            document.body.classList.toggle("dark-mode")
            document.getElementById('darkModeSwitch').src = '../static/images/sun.png'
            document.getElementById('headerLogo').src = '../static/images/logo_dark.png'
            document.getElementById('footerLogo').src = '../static/images/logo_dark.png'
        } else {
            document.getElementById('darkModeSwitch').src = '../static/images/moon.png'
            document.getElementById('headerLogo').src = '../static/images/logo.png'
            document.getElementById('footerLogo').src = '../static/images/logo.png'
        }
    }
}