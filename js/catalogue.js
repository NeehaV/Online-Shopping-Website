//function to load drk mode, fetch JSON data and display products upon loding of the page
function displayProducts() {
    loadDarkMode()
    let requestURL = 'https://api.jsonbin.io/v3/b/63e55d24c0e7653a05737912?meta=false'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.setRequestHeader("X-Master-Key", "$2b$10$TyFI2wAfbErrboANIe2s7eAs7AQvMr6nyjrxw6zKnjEtN/mctbtmm");
    //request.setRequestHeader("X-Bin-Versioning", "true");
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const data = request.response;
        console.log(data)
        localStorage.setItem('choosenCategory', 'all');
        populateDisplay(data)
    }
}


//function to filter products upon clicking of a categorie
function chooseCollection(selection) {
    var data = ''
    let requestURL = 'https://api.jsonbin.io/v3/b/63e55d24c0e7653a05737912?meta=false'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.setRequestHeader("X-Master-Key", "$2b$10$TyFI2wAfbErrboANIe2s7eAs7AQvMr6nyjrxw6zKnjEtN/mctbtmm");
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        data = request.response;
        console.log(data)
        var displayData = ''
        localStorage.setItem('choosenCategory', selection);
        if (selection === 'all') {
            console.log("in all")
            for (var i = 0; i < data.length; i++) {
                displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
            }
        } else {
            console.log("in not all " + selection)
            for (var i = 0; i < data.length; i++) {
                if (selection === data[i].Category) {
                    console.log(data[i])
                    displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                }
            }
        }
        document.querySelector('#product_listing').innerHTML = displayData

    }



}

//function to create display of products
function populateDisplay(data) {
    var displayData = ''
    for (var i = 0; i < data.length; i++) {
        displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
    }
    document.querySelector('#product_listing').innerHTML = displayData
}

//function to get JSON data
function getCatalogueData() {
    let requestURL = 'https://api.jsonbin.io/v3/b/63e55d24c0e7653a05737912?meta=false'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.setRequestHeader("X-Master-Key", "$2b$10$TyFI2wAfbErrboANIe2s7eAs7AQvMr6nyjrxw6zKnjEtN/mctbtmm");
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        const data = request.response;
        console.log(data)
        return data;
    }
}

//function to display products upon selection of size and price filters
function filter() {
    var range = document.querySelector('#multi').value;
    var size = document.querySelector("input[name='size']:checked")
    var selection = localStorage.getItem('choosenCategory')
    document.querySelector('#selected_price').innerHTML = "Price below $" + range;
    var data = ''
    let requestURL = 'https://api.jsonbin.io/v3/b/63e55d24c0e7653a05737912?meta=false'
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.setRequestHeader("X-Master-Key", "$2b$10$TyFI2wAfbErrboANIe2s7eAs7AQvMr6nyjrxw6zKnjEtN/mctbtmm");
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        data = request.response;
        console.log(data)
        var displayData = ''

        if (range == 0 && size == null) {
            if (selection === 'all') {
                for (var i = 0; i < data.length; i++) {
                    displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (selection === data[i].Category) {
                        console.log(data[i])
                        displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                    }
                }
            }
        } else if (size == null && range !== 0) {
            if (selection === 'all') {
                for (var i = 0; i < data.length; i++) {
                    if (parseInt(data[i].price) <= range) {
                        console.log(data[i].price + "   " + range)
                        console.log('bug')
                        displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                    }
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (selection === data[i].Category && parseInt(data[i].price) <= range) {
                        console.log(data[i])
                        displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                    }
                }
            }

        } else if (size !== null && range == 0) {
            var sizeValue = size.value
            if (selection === 'all') {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].size.includes(sizeValue)) {
                        displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                    }
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (selection === data[i].Category && data[i].size.includes(sizeValue)) {
                        console.log(data[i])
                        displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                    }
                }
            }
        } else if(size !== null && range !== 0){
            var sizeValue = size.value
            if (selection === 'all') {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].size.includes(sizeValue) && parseInt(data[i].price) <= range) {
                        displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                    }
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (selection === data[i].Category && data[i].size.includes(sizeValue) && parseInt(data[i].price) <= range) {
                        console.log(data[i])
                        displayData = displayData + "<div class='product-column'><img src='" + data[i].imgSrc + "' alt='dress' onclick='itemSelected("+ data[i].id+")'><p>$" + data[i].price + "</p></div>"
                    }
                }
            }
        }
        console.log("displayong")
        document.querySelector('#product_listing').innerHTML = displayData
        console.log("displayed")

    }
}

//function to choose id and navigate to product page
function itemSelected(id){
    console.log("selected item id is " + id)
    localStorage.setItem('selectedProductID', id)
    location.href = "../pages/product.html"
}

//function to toggle dark mode of the page
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