//display the cart items by fetching JSON data and geting data of each product in cart
function displayCart(){
    loadDarkMode()
    let requestURL = 'https://api.jsonbin.io/v3/b/63e55d24c0e7653a05737912?meta=false'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.setRequestHeader("X-Master-Key", "$2b$10$TyFI2wAfbErrboANIe2s7eAs7AQvMr6nyjrxw6zKnjEtN/mctbtmm");
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const data = request.response;
        var cartData = JSON.parse(localStorage.getItem('cartList'))
        if (cartData === null) {
            document.querySelector('#productList').innerHTML = "<h1>No Items Added to The Cart</h1>"
        } else {
            var subTotal = 0
            var displayString = ''
            for (var i = 0; i < cartData.length; i++) {
                var productData = getProductData(data, cartData[i].id)
                var productTotal = parseInt(productData.price) * parseInt(cartData[i].quantity)
                displayString = displayString + "<hr><div class='prod'><div class='img'><img src='" + productData.imgSrc + "' alt='dress'></div><div class='desc-name'><p>" + productData.name + "</p></div><div class='desc-price'><p>$" + productData.price + "</p></div><div class='desc-quant'><p>" + cartData[i].quantity + "</p></div><div class='desc-subtotal'><p>$"+productTotal+"</p></div></div>"
                subTotal = subTotal + (parseInt(productData.price) * parseInt(cartData[i].quantity))
            }
            document.querySelector('#productList').innerHTML = displayString
            var tax = (subTotal * 13) /100
            var shipping = 5
            var total = subTotal + tax + shipping
            document.querySelector('#subtotal').innerHTML = "$" + subTotal
            document.querySelector('#tax').innerHTML = "$" + tax
            document.querySelector('#shipping').innerHTML = "$" + shipping
            document.querySelector('#total').innerHTML = "$" + total
           
        }

    }
}

//get product data with the use of id
function getProductData(data, id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i]
        }
    }
}

//function to validate the form
function validateForm() {
    let nameError = nameValidation();
    let addressError = addressValidation();
    let postalError = postalValidation();
    let phoneError = phoneValidation();
    let emailError = emailValidation();
    let creditError = creditValidation()

    if (nameError && addressError && emailError && postalError && phoneError && creditError) {
        console.log('true')
        var shippingData = {}
        shippingData.name = document.querySelector('#name').value
        shippingData.address = document.querySelector('#address').value
        shippingData.postalCode = document.querySelector('#postal_code').value
        shippingData.phone = document.querySelector('#phone').value
        shippingData.email = document.querySelector('#email').value
        shippingData.creditCard = document.querySelector('#credit').value
        shippingData = JSON.stringify(shippingData)
        localStorage.setItem('shippingData', shippingData)
        location.href = '../pages/order_confirmation.html'
        
        
    }
    else {
        console.log('false')
        
    }
}

//name validation
function nameValidation() {
    let text = document.getElementById("name").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your Name";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("nameError").innerHTML = spanMessage;
    return returnValue;
}

//address validation
function addressValidation() {
    let text = document.getElementById("address").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your address";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("addressError").innerHTML = spanMessage;
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

//phone validation
function phoneValidation() {
    let text = document.getElementById("phone").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your Phone Number";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("phoneError").innerHTML = spanMessage;
    return returnValue;
}

//credit validation
function creditValidation() {
    let text = document.getElementById("credit").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your Credit Card Number";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("creditError").innerHTML = spanMessage;
    return returnValue;
}

//postal validation
function postalValidation() {
    let text = document.getElementById("postal_code").value;
    let spanMessage;
    let returnValue;
    console.log(text)
    if (text == "") {
        spanMessage = "Please enter your Postal Code";
        returnValue = false;
    }
    else {
        spanMessage = "";
        returnValue = true;
    }
    console.log(spanMessage)
    document.getElementById("postalError").innerHTML = spanMessage;
    return returnValue;
}

//name event listner
function nameEvent(){
    document.getElementById('nameError').innerHTML = ""
}

//address event listner
function addressEvent(){
    document.getElementById('addressError').innerHTML = ""
}

//eamil event listner
function emailEvent(){
    document.getElementById('emailError').innerHTML = ""
}

//phone event listner
function phoneEvent(){
    document.getElementById('phoneError').innerHTML = ""
}

//credit card event listner
function creditEvent(){
    document.getElementById('creditError').innerHTML = ""
}

//postal code event listner
function postalEvent(){
    document.getElementById('postalError').innerHTML = ""
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