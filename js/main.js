const loadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data
  console.log(phones); 
  displayPhones(phones);
}

const displayPhones = phones => {

  const phoneContainer = document.getElementById('phone-container');

  phoneContainer.textContent = '';

  phones.forEach( phone => {

    const phoneCard = document.createElement('div');
    phoneCard.classList = `col-span-1 rounded-lg border-2 border-gray-200 text-center leading-snug pb-5 bg-white`;
    phoneCard.innerHTML = `
                      <div class="bg-[#1111110D] py-10 px-20 m-5 rounded-lg">
                          <img class="inline-block" src="${phone.image}" alt="">
                      </div>
                      <div class="body px-12">
                          <h3 id="card-item-title" class="text-2xl py-2 font-medium">${phone.phone_name}</h3>
                          <button class="rounded-lg bg-blue-500 px-4 py-2 mb-4 text-xl -ml-4 text-white">Show Details</button>
                      </div>
                  `; 

                  phoneContainer.appendChild(phoneCard);
    
  });
}
loadPhone();


const handleSearch = () => {
  
  const searchInputField = document.getElementById('search-input-field');
  const searchText = searchInputField.value; 
  // console.log(searchText);
  loadPhone(searchText);
  searchInputField.value = '';
}