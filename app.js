const removeActiveBtn = () => {
  const buttons = document.getElementsByClassName('category-btn');
  for (let btn of buttons) {
    btn.classList.remove('activeBtnStyle');
    btn.classList.add('categoryBtnStyle_1');
  }
}


const loadCategories = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
  const data = await res.json();
  displayCategories(data.categories);

};

const displayCategories = (categories) => {

  const categoryContainer = document.getElementById('category-btn-container');
  categories.forEach((item) => {
    const { category, category_icon } = item;
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
        
        <button  id="btn-${category}" onclick="loadCategoriesVideo('${category}')" class="categoryBtnStyle_1  category-btn"> <span><img class="w - [40px] h - [40px]" src=${category_icon}/></span>  <span>${category}</span>  </button>
        
        `;
    categoryContainer.appendChild(buttonContainer);
  })

};

const loadPets = async () => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    displayPets(data.pets);
  }
  catch (err) {
    console.error('Get Error from Load pets', err);
  }
};

const displayPets = (pets) => {
  const petsSection = document.getElementById('pets-card-section');
  if (pets.length === 0) {
    petsSection.classList.remove('grid');
    petsSection.innerHTML = `
    

        <div class="bg-gray-100 rounded-[24px] py-[100px]"> 
        
        <div> <img class="mx-auto" src="images/error.webp"/> </div>
        <h2 class="text-[#131313] text-center font-[Inter] text-[32px] font-bold">No Information Available </h2>
        <p class="font-[Lato] font-normal text-[#13131370] text-center"> Pets are not avaiable right now please try another time </p>
        
        </div>
    
    
    `;
    return;
  }
  else {

    petsSection.classList.add('grid');
  }

  petsSection.innerHTML = ""
  pets.forEach((pet) => {

    const { price, pet_name, pet_details, image, date_of_birth, breed, gender } = pet;
    const dateOfBirth = (date_of_birth === null || date_of_birth === undefined) ? 'Not Avilable' : date_of_birth;

    const card = document.createElement('div');
    card.innerHTML = `




        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div class="p-3 mx-auto h-[200px]">
            <img class="rounded-[8px] w-full h-full object-cover " src=${image}  alt="" />
        </div>
        <div class="p-5">
            <h5 class="text-[#131313] font-[Lato] text-[20px] font-bold"> ${pet_name}</h5>
            <p class="flex items-center gap-1"><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_2081_39)">
    <path d="M3.33334 3.33337H8.33334V8.33337H3.33334V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.6667 3.33337H16.6667V8.33337H11.6667V3.33337Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.33334 11.6666H8.33334V16.6666H3.33334V11.6666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.6667 14.1666C11.6667 14.8297 11.9301 15.4656 12.3989 15.9344C12.8677 16.4032 13.5036 16.6666 14.1667 16.6666C14.8297 16.6666 15.4656 16.4032 15.9344 15.9344C16.4033 15.4656 16.6667 14.8297 16.6667 14.1666C16.6667 13.5036 16.4033 12.8677 15.9344 12.3989C15.4656 11.93 14.8297 11.6666 14.1667 11.6666C13.5036 11.6666 12.8677 11.93 12.3989 12.3989C11.9301 12.8677 11.6667 13.5036 11.6667 14.1666Z" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2081_39">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg></span> <span class="text-gray-400 text-[16px] font-normal">Breed: ${breed === undefined ? 'Not Available' : breed} </span> </p>
            <p class="flex items-center gap-1"><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M4.625 1.5V3.375M13.375 1.5V3.375M1.5 14.625V5.25C1.5 4.75272 1.69754 4.27581 2.04917 3.92417C2.40081 3.57254 2.87772 3.375 3.375 3.375H14.625C15.1223 3.375 15.5992 3.57254 15.9508 3.92417C16.3025 4.27581 16.5 4.75272 16.5 5.25V14.625M1.5 14.625C1.5 15.1223 1.69754 15.5992 2.04917 15.9508C2.40081 16.3025 2.87772 16.5 3.375 16.5H14.625C15.1223 16.5 15.5992 16.3025 15.9508 15.9508C16.3025 15.5992 16.5 15.1223 16.5 14.625M1.5 14.625V8.375C1.5 7.87772 1.69754 7.40081 2.04917 7.04917C2.40081 6.69754 2.87772 6.5 3.375 6.5H14.625C15.1223 6.5 15.5992 6.69754 15.9508 7.04917C16.3025 7.40081 16.5 7.87772 16.5 8.375V14.625" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> </span> <span  class="text-gray-400 text-[16px] font-normal">Birth: ${dateOfBirth} </span> </p>
            <p class="flex items-center gap-1"><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g opacity="0.7" clip-path="url(#clip0_2081_51)">
    <path d="M10 11.6666V17.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.5 15H12.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9821 6.60143 13.3333 7.44928 13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11594 11.6667 8.2681 11.3155 7.64297 10.6904C7.01785 10.0652 6.66666 9.21739 6.66666 8.33333C6.66666 7.44928 7.01785 6.60143 7.64297 5.97631C8.2681 5.35119 9.11594 5 10 5Z" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.5 2.5C12.5 3.16304 12.2366 3.79893 11.7678 4.26777C11.2989 4.73661 10.663 5 10 5C9.33696 5 8.70107 4.73661 8.23223 4.26777C7.76339 3.79893 7.5 3.16304 7.5 2.5" stroke="#131313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2081_51">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg> </span> <span  class="text-gray-400 text-[16px] font-normal">Gender: ${gender === undefined ? 'Not Available' : gender} </span> </p>
            <p class="flex items-center gap-1"><span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_2081_59)">
    <path d="M13.9167 6.66667C13.7508 6.19603 13.4479 5.7858 13.0469 5.48878C12.6459 5.19176 12.1652 5.02153 11.6667 5H8.33334C7.67029 5 7.03441 5.26339 6.56557 5.73223C6.09673 6.20107 5.83334 6.83696 5.83334 7.5C5.83334 8.16304 6.09673 8.79893 6.56557 9.26777C7.03441 9.73661 7.67029 10 8.33334 10H11.6667C12.3297 10 12.9656 10.2634 13.4344 10.7322C13.9033 11.2011 14.1667 11.837 14.1667 12.5C14.1667 13.163 13.9033 13.7989 13.4344 14.2678C12.9656 14.7366 12.3297 15 11.6667 15H8.33334C7.83479 14.9785 7.35409 14.8082 6.95311 14.5112C6.55213 14.2142 6.24921 13.804 6.08334 13.3333" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 2.5V5M10 15V17.5" stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2081_59">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg></span> <span class="text-gray-400 text-[16px] font-normal">Price: ${price}$</span> </p>

<div class="border-b-2 border-gray-200 py-1 mb-3"> </div>

        <div class="flex items-center justify-between">
        
        <div>
        <button type="button" class="px-3 py-2 text-xs border-1 border-gray-300 font-medium text-center text-[#0E7A81] bg-white rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300  ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5.5275 8.54163C6.19917 8.54163 6.805 8.16996 7.22 7.64163C7.86688 6.81631 8.67893 6.13511 9.60417 5.64163C10.2067 5.32163 10.7292 4.84496 10.9817 4.21246C11.159 3.76933 11.2501 3.29642 11.25 2.81913V2.29163C11.25 2.12587 11.3159 1.96689 11.4331 1.84968C11.5503 1.73247 11.7092 1.66663 11.875 1.66663C12.3723 1.66663 12.8492 1.86417 13.2008 2.2158C13.5525 2.56743 13.75 3.04435 13.75 3.54163C13.75 4.50163 13.5333 5.41079 13.1475 6.22329C12.9258 6.68829 13.2367 7.29163 13.7517 7.29163M13.7517 7.29163H16.3567C17.2117 7.29163 17.9775 7.86996 18.0683 8.72079C18.1058 9.07246 18.125 9.42913 18.125 9.79163C18.1284 12.0719 17.3492 14.2843 15.9175 16.0591C15.5942 16.4608 15.095 16.6666 14.58 16.6666H11.2333C10.8308 16.6666 10.43 16.6016 10.0475 16.475L7.4525 15.6083C7.07009 15.4811 6.66968 15.4164 6.26667 15.4166H4.92M13.7517 7.29163H11.875M4.92 15.4166C4.98917 15.5875 5.06417 15.7541 5.145 15.9183C5.30917 16.2516 5.08 16.6666 4.70917 16.6666H3.9525C3.21167 16.6666 2.525 16.235 2.30917 15.5266C2.02054 14.5793 1.87422 13.5944 1.875 12.6041C1.875 11.31 2.12084 10.0741 2.5675 8.93913C2.8225 8.29413 3.4725 7.91663 4.16667 7.91663H5.04417C5.4375 7.91663 5.665 8.37996 5.46084 8.71663C4.74908 9.88825 4.37369 11.2332 4.37584 12.6041C4.37584 13.5991 4.56917 14.5483 4.92084 15.4166H4.92Z" stroke="#131313" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> 
        </button>

        </div>
        
        <div> 
        <button class="px-3 py-2 text-xs border-1 border-gray-300 font-medium text-center text-[#0E7A81] bg-white rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300  "> Adopt</button>
        
        </div>
        <div> 
        <button class="px-3 py-2 text-xs border-1 border-gray-300 font-medium text-center text-[#0E7A81] bg-white rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300  "> Details</button>
        
        </div>
        
        
        </div>
        </div>
    </div>

        
        `;
    petsSection.appendChild(card);

  });
};

const loadCategoriesVideo = async (category) => {

  const petCards = document.getElementById('pets-card-section');
  petCards.innerHTML = "";


  const spinner = document.getElementById('spinner');

  spinner.style.display = 'block';

  setTimeout(async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await res.json();
    console.log(data.data);
    removeActiveBtn();
    const activebtn = document.getElementById(`btn-${category}`);
    activebtn.classList.remove('categoryBtnStyle_1')
    activebtn.classList.add('activeBtnStyle')
    spinner.style.display = 'none';
    displayPets(data.data);


  }, 2000);



}

loadPets();
loadCategories();

