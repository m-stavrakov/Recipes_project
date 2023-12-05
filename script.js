// ##################### VARIABLES ##################
const logIn = document.getElementById('log-in');
const wrapper = document.querySelector('.wrapper');
const closeBtn = document.getElementById('close');
const emailInput = document.querySelector('.input_email');
const passwordInput = document.querySelector('.input_password');
const iconEmail = document.querySelector('.icon_email');
const iconPassword = document.querySelector('.icon_password');
const eye = document.getElementById('eye');
const slides = document.querySelectorAll('.slide');
const prevSlide = document.querySelector('.prev');
const nextSlide = document.querySelector('.next');
// const carouselBtn = document.querySelectorAll('[data-carousel-btn]');

// ##################### OPEN AND CLOSE LOGIN ##################
logIn.addEventListener('click', () => {
    wrapper.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// ##################### INTERACTIVITY WITH INPUT ##################
document.addEventListener('mousedown', (event) => {
    if (emailInput.contains(event.target)) {
        iconEmail.classList.add('test');
        document.getElementById('email-box').classList.add('changed');
      } else {
        iconEmail.classList.remove('test');
        document.getElementById('email-box').classList.remove('changed');
      }
});

document.addEventListener('mousedown', (event) => {
    if (passwordInput.contains(event.target)) {
        iconPassword.classList.add('test');
        document.getElementById('password-box').classList.add('changed');
      } else {
        iconPassword.classList.remove('test');
        document.getElementById('password-box').classList.remove('changed');
      }
});

// ##################### VISIBLE/INVISIBLE PASSWORD ##################

eye.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? "text" : "password";
    passwordInput.setAttribute('type', type);

    if (eye.classList.contains("ri-eye-line")) {
        eye.classList.remove("ri-eye-line");
        eye.classList.add("ri-eye-off-line");
      } else {
        eye.classList.remove("ri-eye-off-line");
        eye.classList.add("ri-eye-line");
      }
});

// ##################### CAROUSEL ##################
let curSlide = 0;
let maxSlide = slides.length - 1;

moveSlide(curSlide);

//next slide
nextSlide.addEventListener('click', () => {
  if (curSlide === maxSlide) {
    curSlide = 0;
  }else{
    curSlide++
  }

  moveSlide(curSlide);
});

//previous slide
prevSlide.addEventListener('click', () => {
  if (curSlide === 0){
    curSlide = maxSlide;
  }else{
    curSlide--;
  }

  moveSlide(curSlide);
});

function moveSlide(curSlide) {
  slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
}

// ##################### STAR RATING ##################
let stars = document.querySelectorAll(".rating_container span");
let products = document.querySelectorAll(".rating_container");
let ratings = [];

for (let star of stars){
  star.addEventListener('click', function(){
    let ratingChildren = star.parentElement.children;
    for(let child of ratingChildren){
      if(child.getAttribute('data-clicked')){
        return false; //preventing us to rate the same product twice
      }
    }
    
    this.setAttribute('data-clicked', 'true');
    // storing the ratings
    let rating = this.dataset.rating;
    let productId = this.parentElement.dataset.productid;

    let data = {
      'stars': rating,
      'product-id': productId
    }

    ratings.push(data);
    localStorage.setItem('rating', JSON.stringify(ratings));
  });
}

//storing the rating even after reload
if (localStorage.getItem('rating')){
  ratings = JSON.parse(localStorage.getItem('rating'));
  for (let rating of ratings){
    for (let product of products){
      if (rating['product-id'] === product.dataset.productid){
        let reversedStars = Array.from(product.children).reverse();
        let indexStars = parseInt(rating['stars']) - 1;
        reversedStars[indexStars].setAttribute('data-clicked', 'true');
      }
    }
  }
}

// ##################### RECIPE SHOW AND HIDE ##################
const toggleCategories = document.querySelectorAll('.categories_row');
const toggleRecipes = document.querySelectorAll('.top_recipes');
const recipesTitle = document.querySelectorAll('.recipes_section-title');

toggleCategories.forEach(category => {
  category.addEventListener('click', function() {
    const targetId = this.getAttribute('data-list');
    const targetRecipe = document.getElementById(targetId);

      if (targetRecipe.style.display === 'block'){
        targetRecipe.style.display = 'none';
      }else {
        toggleRecipes.forEach(recipe => {
          if (recipe.id === targetId){
            recipe.style.display = 'block';
          }else {
            recipe.style.display = 'none';
          }

          switch(targetId){
            case 'tab_1': recipesTitle[0].innerHTML = 'Salads';
            break;
            case 'tab_2': recipesTitle[1].innerHTML = 'Pasta';
            break;
            case 'tab_3': recipesTitle[2].innerHTML = 'Seafood';
            break;
            case 'tab_4': recipesTitle[3].innerHTML = 'Vegan';
            break;
            case 'tab_5': recipesTitle[4].innerHTML = 'Pizza';
            break;
            case 'tab_6': recipesTitle[5].innerHTML = 'Dessert';
            break;
            default:
              break;
          }
        });
      }
  });
});


// ##################### CHECK LIST ##################
// let test = document.getElementById('test');
// test = {
// const checkItem = document.querySelectorAll('.check');

// checkItem.forEach(unchecked => {
//   unchecked.addEventListener('click', function() {
//     this.classList.add('checked');
//   });
// });
// }