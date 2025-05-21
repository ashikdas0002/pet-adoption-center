const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/peddy/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.categories);
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((categoryItem) => {
        const { category, category_icon } = categoryItem
        const categorybtn = document.createElement('div');
        categorybtn.innerHTML = `
        <button class="category-btn-style category-btn w-[150px] md:w-[250px] mx-auto mb-4 ">
        
                    <span><img src=${category_icon} /></span>
                    <span> ${category}</sapn>
        </button>
        
        `;
        categoryContainer.appendChild(categorybtn);
    });
}

loadCategories();