const removeItem1 = document.querySelector(".remove1");
const addItem1 = document.querySelector(".add1");
let newValue1 = document.querySelector(".quantity1");
let quantity1 = document.querySelector(".quantity1").innerText;

let salePrice1 = document.querySelector(".sale__price1").innerText;
let getSalePrice1 = document.querySelector(".sale__price1");

let regularPrice1 = document.querySelector(".regular__price1").innerText;
let getRegularPrice1 = document.querySelector(".regular__price1");

let newSale;
let newRegular;

// Item 2 values
const removeItem2 = document.querySelector(".remove2");
const addItem2 = document.querySelector(".add2");
let newValue2 = document.querySelector(".quantity2");
let quantity2 = document.querySelector(".quantity2").innerText;

let salePrice2 = document.querySelector(".sale__price2").innerText;
let getSalePrice2 = document.querySelector(".sale__price2");

let regularPrice2 = document.querySelector(".regular__price2").innerText;
let getRegularPrice2 = document.querySelector(".regular__price2");

let newSale2;
let newRegular2;

// Items for form validation

// Functions 
function removeQuantity(){
  if(quantity1 == 1){
    console.log("You can't remove item");
  } else{
    quantity1 = quantity1 - 1;
    newValue1.innerText = quantity1;

    newSale = (salePrice1 * quantity1);
    getSalePrice1.innerText = newSale.toFixed(2);

    newRegular = (regularPrice1 * quantity1);
    getRegularPrice1.innerText = newRegular.toFixed(2);
  }
}

function addQuantity(){
  // If I don't have calculation -0 and user wants to add item it will add it as a string and not int, not sure why!?
  quantity1 = quantity1 - 0;
  quantity1 = quantity1 + 1;
  newValue1.innerText = quantity1;

  newSale = (salePrice1 * quantity1);
  getSalePrice1.innerText = newSale;

  newRegular = (regularPrice1 * quantity1);
  getRegularPrice1.innerText = newRegular.toFixed(2);
}

function removeQuantity2(){
  if(quantity2 == 1){
    console.log("You can't remove item");
  } else{
    quantity2 = quantity2 - 1;
    newValue2.innerText = quantity2;

    newSale2 = (salePrice2 * quantity2);
    getSalePrice2.innerText = newSale2.toFixed(2);

    newRegular2 = (regularPrice2 * quantity2);
    getRegularPrice2.innerText = newRegular2.toFixed(2); 
  }
}

function addQuantity2(){
  // If I don't have calculation -0 and user wants to add item it will add it as a string and not int, not sure why!?
  quantity2 = quantity2 - 0;
  quantity2 = quantity2 + 1;
  newValue2.innerText = quantity2;

  newSale2 = (salePrice2 * quantity2);
  getSalePrice2.innerText = newSale2.toFixed(2);

  newRegular2 = (regularPrice2 * quantity2);
  getRegularPrice2.innerText = newRegular2.toFixed(2);
}

// Form validation


// Event listeners
removeItem1.addEventListener("click", removeQuantity);
addItem1.addEventListener("click", addQuantity);

removeItem2.addEventListener("click", removeQuantity2);
addItem2.addEventListener("click", addQuantity2);




const getButton = document.querySelector("button");
const emailValue = document.getElementById("email");
const nameValue = document.getElementById("name");
const addressValue = document.getElementById("address");
const cityValue = document.getElementById("city");
const countryValue = document.getElementById("country");
const postalValue = document.getElementById("postalcode");


function getEmailValue(){
  const saveEmail = emailValue.value;
  const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (saveEmail == "" || !saveEmail.match(validateEmail)){
    emailValue.classList.add("error--form");
  } else {
    emailValue.classList.remove("error--form");
  }
}

function validateName(){
  const saveName = nameValue.value;

  if (saveName == ""){
    nameValue.classList.add("error--form");
  }else
    nameValue.classList.remove("error--form");
}

function validateAddress(){
  const saveAddress = addressValue.value;
  if (saveAddress == "") {
    addressValue.classList.add("error--form");
  } else
    addressValue.classList.remove("error--form");
}

function validateCity(){
  const saveCity = cityValue.value;
  if (saveCity == "") {
    cityValue.classList.add("error--form");
  } else
  cityValue.classList.remove("error--form");
}

function validatePostal(){
  const savePostal = postalValue.value;
  if (savePostal == ""){
    postalValue.classList.add("error--form");
  } else {
    postalValue.classList.remove("error--form");
  }
}

function validateCountry(){
  const saveCountry = countryValue.value;
  if (saveCountry == "select"){
    countryValue.classList.add("error--form");
  } else {
    countryValue.classList.remove("error--form");
  }
}

getButton.addEventListener("click", getEmailValue);
getButton.addEventListener("click", validateName);
getButton.addEventListener("click", validateAddress);
getButton.addEventListener("click", validateCity);
getButton.addEventListener("click", validatePostal);
getButton.addEventListener("click", validateCountry);