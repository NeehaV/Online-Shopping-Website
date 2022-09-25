//fetch JSON data and pass to display product
function fetchProduct() {
    loadDarkMode()
    const id = localStorage.getItem('selectedProductID')
    console.log(localStorage.getItem('cartList'))
        var productData
    let requestURL = 'https://api.jsonbin.io/b/61ac0c4b62ed886f915a34d7/1'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const data = request.response;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                productData = data[i]
                console.log(productData)
                displayProduct(productData)
            }
        }
    }
    
}

//function to display product selected
function displayProduct(productData){
    document.querySelector('#img').innerHTML = "<img src='"+ productData.imgSrc +"' alt='dress'>"
    document.querySelector('#productInfo').innerHTML = productData.description
    document.querySelector('#productNum').innerHTML = "Product No. " + productData.id + "</p><p id='price'>Price: $" +productData.price
    document.querySelector('#product-name').innerHTML = productData.name
    var sizeString = productData.size
    var sizes = sizeString.split(",")
    var sizeDisplayString = ''
    for(var i = 0; i< sizes.length; i++){
        sizeDisplayString = sizeDisplayString + "<option value='"+sizes[i]+"'>"+sizes[i]+"</option>"
    }
    document.querySelector('#size').innerHTML = sizeDisplayString
}

//function to add items to cart
function addToCart(){
    const id = localStorage.getItem('selectedProductID')
    var data ={}
    var size = document.querySelector('#size').value;
    var quantity = document.querySelector('#quantity').value
    data.id = id
    data.quantity = quantity
    data.size = size
    console.log(data)
    dataList = []
    dataList.push(data)
    dataList  = JSON.stringify(dataList)
    var cartList =JSON.parse(localStorage.getItem('cartList'))
    if(cartList === null){
        localStorage.setItem('cartList', dataList)
    } else {
        cartList.push(data)
        localStorage.setItem('cartList', JSON.stringify(cartList))
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

