document.addEventListener('DOMContentLoaded', () => {

    fetchCategories();
    fetchProducts();


    function fetchCategories() {
        fetch('http://127.0.0.1:8080/category/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const categories = JSON.parse(data);

                // populateCategoryDropdown(categories);
                populateProductCategories(categories);
                categories.forEach(category => {
                    // console.log('Category:', category.name);
                });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function fetchProducts() {
        fetch('http://127.0.0.1:8080/product/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const products = JSON.parse(data);

                // populateCategoryDropdown(products);
                populateProducts(products);
                products.forEach(product => {
                    console.log('Products:', product.name);
                });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

 
function populateProductCategories(categories) {
    const container = document.getElementById('category-box-container');
    
    // Clear any existing content
    container.innerHTML = '';

    categories.forEach(category => {
        if (category.name && category.description) { // Skip null or empty values
            const box = document.createElement('div');
            box.className = 'box';

            box.innerHTML = `
                <img src="images/category-placeholder.jpg" alt="">
                <h3>${category.name}</h3>
                <p>upto 15% off</p>
                <a href="#" class="btn">shop now</a>
            `;

            container.appendChild(box);
        }
    });
}

function populateProducts(products) {
    const container = document.getElementById('product-box-container');
    
    // Clear any existing content
    container.innerHTML = '';

    products.forEach(product => {
        if (product.name && product.description) { // Skip null or empty values
            const box = document.createElement('div');
            box.className = 'box';

            box.innerHTML = `
                <img src="${product.image}" alt="">
                <h3>${product.name}</h3>
                <p>Ksh.${product.price}</p>
                <button onClick=addToCart(${product.id}) class="btn">Add to Cart</button>
            `;

            container.appendChild(box);
        }
    });
}
function addToCart(id) {
    const requestBody = {
        "product": {
            "id": id
        },
        "quantity": 12,
        "cart": {
            "id": 1
        }
    };
    const jsonBody = JSON.stringify(requestBody);


        fetch('http://127.0.0.1:8080/cartitem/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:jsonBody
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const cart = JSON.parse(data);

                console.log(cart.length)
                updateCartCount(cart.length);

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
    
}

function updateCartCount(count) {
    document.querySelector('.cart-count').textContent = count;
}

