const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/peddy/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.categories);
};

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
};

const loadPets = async () => {
    const url = `https://openapi.programming-hero.com/api/peddy/pets`;
    const res = await fetch(url);
    const data = await res.json();
    displayPets(data.pets);
};

const displayPets = (pets) => {
    const petsContainer = document.getElementById('pets-container');

    pets.forEach((pet) => {
        const { price, gender, date_of_birth, image, breed, pet_name } = pet;

        const card = document.createElement('div');
        card.innerHTML = `
        
        
              <div class="card bg-base-100 w-96 shadow-sm">
        <figure class="px-10 pt-10">
          <img
            src=${image}
            alt="Pets"
            class="rounded-xl" />
        </figure>
        <div class="card-body ">
          <h2 class="text-[#131313ea] font-[Inter] text-[20px] font-bold">${pet_name}</h2>
          <div> 
          <p class="flex items-center gap-2"><span> <img src="images/icon-1.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Breed: ${!breed ? "Not Available" : breed}</span> </p>
          <p class="flex items-center gap-2"><span> <img src="images/icon-2.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Birth: ${!date_of_birth ? "Not Available" : date_of_birth}</span> </p>
          <p class="flex items-center gap-2"><span> <img src="images/icon-3.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Gender: ${!gender ? "Not Available" : gender}</span> </p>
          <p class="flex items-center gap-2"><span> <img src="images/icon-4.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Price: ${!price ? "To be Continue" : price}$</span> </p>
          </div>
          <div class="border-t-2 border-gray-200 rounded-sm"> </div>
          <div class="card-actions flex items-center justify-between">
          <button class="btn "><img src="images/icon-5.svg"/></button>
          <button class="btn  text-[#0E7A81] font-bold text-[18px] font-[Lato]">Adopt</button>
          <button class="btn  text-[#0E7A81] font-bold text-[18px] font-[Lato]">Details</button>
          
          </div>
        </div>
      </div>
        
        
        
        `;

        petsContainer.appendChild(card);


    });
}



loadCategories();
loadPets(); 