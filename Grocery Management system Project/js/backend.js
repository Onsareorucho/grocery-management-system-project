document.addEventListener('DOMContentLoaded', () => {

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
        console.log('Category:', category.name);
    });
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
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