//get the detais of products using cartData and display thr products
function loadCart() {
    loadDarkMode()
    let requestURL = 'https://api.jsonbin.io/b/61ac0c4b62ed886f915a34d7/1'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
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
            //document.querySelector('#numberOfItems').innerHTML = cartData.length + " Items"
            for (var i = 0; i < cartData.length; i++) {
                var productData = getProductData(data, cartData[i].id)
                displayString = displayString + "<div class='product'><div class='img-p'><img src='" + productData.imgSrc + "' alt='dress'></div><div class='p-des'><p>" + productData.name + "<br>Product No. " + productData.id + "<br>Price: $" + productData.price + "</p><br><p>Size: " + cartData[i].size + "<br>Quantity: " + cartData[i].quantity + "</p></div></div>"
                subTotal = subTotal + (parseInt(productData.price) * parseInt(cartData[i].quantity))
            }
            document.querySelector('#productList').innerHTML = displayString
            var tax = (subTotal * 13) /100
            var shipping = 5
            var total = subTotal + tax + shipping
            var pricingDispaly = "Subtotal: $" + subTotal + "<br>Tax: $" + tax + "<br>Shipping: $"+ shipping+ "<br>"
            document.querySelector('#pricing').innerHTML = pricingDispaly
            document.querySelector('#total').innerHTML = "TOTAL : $" + total
            //document.querySelector('#noOfItems').innerHTML = cartData.length + " Items"
        }

    }
}

//get data of a product based on its id
function getProductData(data, id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i]
        }
    }
}

//navigate to orders page
function checkout(){
    var cartData = JSON.parse(localStorage.getItem('cartList'))
        if (cartData !== null) {
            location.href = '../pages/order.html'
        }
    
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