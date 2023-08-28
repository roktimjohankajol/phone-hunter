const loadPhone = async (searchText='samsung', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data
  // console.log(phones); 
  displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

  const phoneContainer = document.getElementById('phone-container');

  phoneContainer.textContent = '';

  // Show all Container 
   const showAllContainer = document.getElementById('show-all-container');

   if(phones.length > 16 && !isShowAll){
      showAllContainer.classList.remove('hidden');
   }
   else{
      showAllContainer.classList.add('hidden');
   }

  //  console.log('is Show All', isShowAll);
  
   if(!isShowAll){
    phones = phones.slice(0,16);
   }

  phones.forEach( phone => {

    const phoneCard = document.createElement('div');
    phoneCard.classList = `col-span-1 rounded-lg border-2 border-gray-200 text-center leading-snug pb-5 bg-white`;
    phoneCard.innerHTML = `
                      <div class="bg-[#F3F8FF] py-10 px-20 m-5 rounded-lg">
                          <img class="inline-block" src="${phone.image}" alt="">
                      </div>
                      <div class="body px-12">
                          <h3 id="card-item-title" class="text-2xl py-2 font-medium">${phone.phone_name}</h3>
                          <button type="button" onclick="handleShowDetails('${phone.slug}'); my_modal_5.showModal()" class="rounded-lg bg-blue-500 px-4 py-2 mb-4 text-xl -ml-4 text-white">Show Details</button>
                      </div>
                  `; 

                  phoneContainer.appendChild(phoneCard, isShowAll);
    
  });
  // Hide Loading Spinner 
    toggleLoadingSpinner(false);
}


const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchInputField = document.getElementById('search-input-field');
  const searchText = searchInputField.value; 
  loadPhone(searchText, isShowAll);
  // searchInputField.value = '';
}

 // Loading Spinner 
 const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}

const handleShowAll = () => {
  handleSearch(true);
}

const handleShowDetails = async (id) => {
    // console.log('Show Details Button Clicked', id);
    // Load Single Phone Data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data.data);
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  const showDetailsContainer = document.getElementById('my_modal_5');
  showDetailsContainer.innerHTML=`
            <form method="dialog" class="modal-box">
            <div class="bg-[#F3F8FF] py-4 px-20 m-5 rounded-lg text-center">
                 <img class="inline-block" src="${phone.image}" alt="">
              </div>
              <div class="px-6">
              <h3 class="text-2xl py-2 font-medium">${phone.name}</h3>
              <p><strong>Storage : </strong>${phone.mainFeatures.storage}</p>
              <p><strong>Display Size : </strong>${phone.mainFeatures.displaySize}</p>
              <p><strong>Chipset : </strong>${phone.mainFeatures.chipSet}</p>
              <p><strong>Memory : </strong>${phone.mainFeatures.memory}</p>
              <p><strong>Slug : </strong>${phone.slug}</p>
              <p><strong>Release data : </strong>${phone.releaseDate}</p>
              <p><strong>Brand : </strong>${phone.brand}</p>
              <p><strong>GPS : </strong>${phone.others?.GPS || 'No GPS Available'}</p>
              </div>
            <div class="modal-action text-right px-6">
            <button class="rounded-lg bg-blue-500 px-4 py-2 text-xl -ml-4 text-white">Close</button>
            </div>
          </form>
  
  `;
  my_modal_5.showModal();
}

loadPhone();