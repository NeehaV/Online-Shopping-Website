//display the cart items by fetching JSON data and geting data of each product in cart
function orderDetails(){
    loadDarkMode()
    let requestURL = 'https://api.jsonbin.io/b/61ac0c4b62ed886f915a34d7/1'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const data = request.response;
        var cartData = JSON.parse(localStorage.getItem('cartList'))
        var shippingData = JSON.parse(localStorage.getItem('shippingData'))
        if (cartData === null) {
            document.querySelector('#productList').innerHTML = "<h1>No Items Added to The Cart</h1>"
        } else {
            var subTotal = 0
            var displayString = ''
            for (var i = 0; i < cartData.length; i++) {
                var productData = getProductData(data, cartData[i].id)
                var productTotal = parseInt(productData.price) * parseInt(cartData[i].quantity)
                displayString = displayString + "<hr><div class='prod'><div class='img'><img src='"+productData.imgSrc+"' alt='tops'></div><div class='desc-name'>"+productData.name+"</p></div><div class='desc-price'><p>$"+productData.price+"</p></div><div class='desc-quant'><p>"+cartData[i].quantity+"</p></div><div class='desc-subtotal'><p>$"+productTotal+"</p></div></div>"
                subTotal = subTotal + (parseInt(productData.price) * parseInt(cartData[i].quantity))
            }
            document.querySelector('#productList').innerHTML = displayString
            var tax = (subTotal * 13) /100
            var shipping = 5
            var total = subTotal + tax + shipping
            console.log(total)
            var pricingDispaly = "Subtotal: $" + subTotal + "<br>Tax: $" + tax + "<br>Shipping: $"+ shipping+ "<br>"
            document.querySelector('#subtotal').innerHTML = subTotal
            document.querySelector('#tax').innerHTML = tax
            document.querySelector('#total').innerHTML = total
            document.querySelector('#name').innerHTML = shippingData.name
            document.querySelector('#address').innerHTML = shippingData.address
            document.querySelector('#postal').innerHTML = shippingData.postalCode
            document.querySelector('#phone').innerHTML = shippingData.phone
            document.querySelector('#email').innerHTML = shippingData.email
            document.querySelector('#credit').innerHTML = shippingData.creditCard           
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

//function to place order and route to order finalized page
function placeOrder(){
    document.cookie = "test1=Hello; SameSite=None; Secure";
    localStorage.setItem('orderNo', Math.floor(100000 + Math.random() * 900000))
    localStorage.removeItem('selectedProductID')
    localStorage.removeItem('choosenCategory')
    localStorage.removeItem('cartList')
location.href = '../pages/order_finalized.html'
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