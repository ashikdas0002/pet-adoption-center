const removeActiveBtn = () => {
    const categoryBtns = document.getElementsByClassName('category-btn');
    for (let btn of categoryBtns) {
        btn.classList.remove('activeBtnStyle');
        btn.classList.add('category-btn-style');
    }
}

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
        <button id="btn-${category}" onclick="loadCategoryPets('${category}')" class="category-btn-style category-btn w-[150px] md:w-[250px] mx-auto mb-4 ">
        
                    <span><img class=" h-[30px] md:h-[50px]" src=${category_icon} /></span>
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
    const petsContainer = document.getElementById('pets-section-container');
    petsContainer.innerHTML = "";
    if (pets.length === 0) {
        petsContainer.innerHTML = `
        
        <div class="w-[300px] md:w-[985px] py-10 bg-gray-200 flex flex-col items-center justify-center gap-5 mx-auto mb-5 rounded-[24px]"?>
        <div> 
        <img src="images/error.webp" />
        </div>
        <h3 class="text-[#131313] font-[Inter] text-[24px] md:text-[32px] font-bold">No Information Available</h3>
        <p class="text-[#131313B2]  w-[250px] md:w-[300px] text-center font-[Lato] text-[16px] font-normal"> This Category pet's currently not available right Now !! </p>
        </div>
        
        
        `;
    }
    pets.forEach((pet) => {
        const { price, gender, date_of_birth, image, breed, pet_name, petId } = pet;

        const card = document.createElement('div');
        card.innerHTML = `
        
        
              <div class="card bg-base-100 w-[300px] md:w-[320px] shadow-sm mx-auto">
        <figure  class="px-4 pt-10">
          <img
            src=${image}
            alt="Pets"
            class=" w-[200px] rounded-xl" />
        </figure>
        <div class="card-body ">
          <h2 class="text-[#131313ea] font-[Inter] text-[20px] font-bold">${pet_name}</h2>
          <div> 
          <p class="flex items-center gap-2"><span> <img src="images/icon-1.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Breed: ${!breed ? "Not Available" : breed}</span> </p>
          <p class="flex items-center gap-2"><span> <img src="images/icon-2.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Birth: ${!date_of_birth ? "Not Available" : date_of_birth}</span> </p>
          <p class="flex items-center gap-2"><span> <img src="images/icon-3.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Gender: ${!gender ? "Not Available" : gender}</span> </p>
          <p class="flex items-center gap-2"><span> <img src="images/icon-4.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Price: ${!price ? "To be Continue" : `${price}$`}</span> </p>
          </div>
          <div class="border-t-2 border-gray-200 rounded-sm"> </div>
          <div class="card-actions flex items-center justify-between">
          <button onclick="likedPets(${petId})" class="btn "><img src="images/icon-5.svg"/></button>
          <button id="btn-${petId}" onclick="adtoptPets(${petId})" class="btn  text-[#0E7A81] font-bold text-[18px] font-[Lato]">Adopt</button>
          <button onclick="DisplayPetsDetails(${petId})" class="btn  text-[#0E7A81] font-bold text-[18px] font-[Lato]">Details</button>
          
          </div>
        </div>
      </div>
        
        
        
        `;

        petsContainer.appendChild(card);


    });
};

const loadCategoryPets = async (category) => {
    const petsContainer = document.getElementById('pets-section-container');
    petsContainer.innerHTML = "";
    const spinnerLoader = document.getElementById('spinner');
    spinnerLoader.classList.remove('hidden');
    removeActiveBtn()
    const categoryBtn = document.getElementById(`btn-${category}`);
    categoryBtn.classList.remove('category-btn-style');
    categoryBtn.classList.add('activeBtnStyle');


    setTimeout(async () => {
        const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`;
        const res = await fetch(url);
        const data = await res.json();
        spinnerLoader.classList.add('hidden');
        displayPets(data.data);


    }, 2000);


};

const likedPets = async (petId) => {
    const likedPets = document.getElementById('liked-pets-container');
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    const pet = data.petData;
    const img = document.createElement('img');
    img.src = pet.image;
    img.classList.add('w-[100px]', 'md:w-[120px]', 'rounded-md', 'mx-2', 'my-2');
    likedPets.appendChild(img);


};

const adtoptPets = async (adoptPetId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${adoptPetId}`);
    const data = await res.json();
    const petId = data.petData.petId;
    const adoptPetMoal = document.getElementById('adoptionModal');
    adoptPetMoal.showModal();
    const petIdBtn = document.getElementById(`btn-${petId}`);
    const countDown = document.getElementById('countDown');
    let count = 3;
    countDown.innerText = count;
    const interval = setInterval(() => {
        count--;
        countDown.innerText = count;
        if (count === 0) {
            clearInterval(interval);
            adoptPetMoal.close();
            petIdBtn.innerText = "Adopted";
            petIdBtn.classList.add('btn-disabled');
        }
    }, 1000);

};

const DisplayPetsDetails = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    const petDetails = data.petData;
    console.log(petDetails);
    const { price, gender, date_of_birth, image, breed, pet_name, vaccinated_status, pet_details
    } = petDetails;
    document.getElementById('detailsModal').showModal();
    const petDetailsContainer = document.getElementById('pet-details-container');
    petDetailsContainer.innerHTML = `
    
 <div> 
 <figure class="px-4 pt-4">
          <img
            src=${image}
            alt="Pets"
            class=" h-full w-full object-cover rounded-sm" />
        </figure>
         <div>
            <h2 class="text-[#131313ea] font-[Inter] text-[24px] md:text-[32px] font-bold">${pet_name}</h2>
         <div class="md:flex  gap-4"> 
         <div>
         <p class="flex items-center gap-2"><span> <img src="images/icon-1.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Breed: ${!breed ? "Not Available" : breed}</span> </p>
         <p class="flex items-center gap-2"><span> <img src="images/icon-3.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Gender: ${!gender ? "Not Available" : gender}</span> </p>
         <p class="flex items-center gap-2"><span> <img src="images/icon-3.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Vaccinated status: ${vaccinated_status}</span> </p>
         
         
         </div>
          
          <div> 
          <p class="flex items-center gap-2"><span> <img src="images/icon-2.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Birth: ${!date_of_birth ? "Not Available" : date_of_birth}</span> </p>
           <p class="flex items-center gap-2"><span> <img src="images/icon-4.svg"/> </span> <span class="text-[#131313B2] font-[Lato] text-[20px] font-normal">Price: ${!price ? "To be Continue" : `${price}$`}</span> </p>
          </div>
         
         </div>
         
          
          </div>
          <div class="border-b-1 border-gray-300 py-2 "> </div>
          <h4 class="text-[#131313] font-[Inter] text-[24px] md:text-[30px] font-semibold" >Details Information </h4>
        <p class="text-[#131313B2] font-[Inter] font-normal text-[16px]">${pet_details}</p>
 <div class="flex items-center justify-center"> 
 
    <button class="btn w-[80%] bg-[#0E7A811A] border-1 border-[#0E7A8133] text-center mt-4 text-[#0E7A81] font-[Lato] text-[20px] font-bold" onclick="document.getElementById('detailsModal').close()">Cancel</button>
 
 </div>
        
    
    `;


};

const sortByPrice = async () => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pets`;
    const res = await fetch(uri);
    const data = await res.json();
    const pets = data.pets;
    let allPets = [];
    allPets = pets.sort((a, b) => (a.price || 0) - (b.price || 0));
    displayPets(allPets);

}



loadCategories();
loadPets(); 