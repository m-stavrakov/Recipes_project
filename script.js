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
        iconEmail.classList.add('icon-color');
        document.getElementById('email-box').classList.add('changed');
      } else {
        iconEmail.classList.remove('icon-color');
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
let carouselPresent = document.getElementById('carousel');



if (carouselPresent) {
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
moveSlide(curSlide);

}

// ##################### STAR RATING ##################
let stars = document.querySelectorAll(".rating_container span");
let products = document.querySelectorAll(".rating_container");
let ratings = [];

for (let star of stars){
  star.addEventListener('click', function(){
    let ratingChildren = star.parentElement.children; //gets a collection of all the children elements of the parent element
    for(let child of ratingChildren){ //looping through each child element 
      if(child.getAttribute('data-clicked')){
        return false; //preventing to rate the same product twice
      }
    }
    
    //if the star has not been clicked it is assigned data-clicked
    this.setAttribute('data-clicked', 'true');

    // storing the ratings
    let rating = this.dataset.rating; //this selects the specific star that has been selected using the data-rating numbers
    let productId = this.parentElement.dataset.productid; //this selects the specific product 

    let data = {
      'stars': rating,
      'product-id': productId
    }

    ratings.push(data);
    localStorage.setItem('rating', JSON.stringify(ratings));
  });
}

//storing the rating after reload
if (localStorage.getItem('rating')){
  ratings = JSON.parse(localStorage.getItem('rating'));
  for (let rating of ratings){
    for (let product of products){
      if (rating['product-id'] === product.dataset.productid){
        let reversedStars = Array.from(product.children).reverse(); //Retrieves all the child elements of the current product element and reverses them into an array
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
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.ingredients_list-items, .preparation_list-items');

  items.forEach(item => {
    const ingredientsText = item.querySelector('.ingredients_text');
    const circle = item.querySelector('.unchecked_circle');

    ingredientsText.addEventListener('click', () => {
      toggleItemState(ingredientsText, circle);
    });

    circle.addEventListener('click', () => {
      toggleItemState(ingredientsText, circle);
    });
  });

  function toggleItemState(ingredientsText, circle){
    ingredientsText.classList.toggle('checked');
    toggleImage(circle);
  }

  function toggleImage(circle) {
    const currentImg = circle.getAttribute('src');
    const unchecked = './images/circle-regular.png';
    const checked = './images/circle_checked-removebg-preview.png';

    const  newSrc = currentImg === unchecked ? checked : unchecked;
    circle.setAttribute('src', newSrc);
  }
});


// ##################### COMMENT FORM ##################
const commentBtn = document.getElementById('form-link');
const formInner = document.getElementById('form-inner');
const formPresent = document.getElementById('user_comment');

if (formPresent){
  commentBtn.addEventListener('click', () => {
    formInner.classList.toggle('form_hide');
  });
}
// ##################### ADDING THE COMMENT ##################
const submitBtn = document.getElementById('submit_btn');
const commentBox = document.querySelector('.comment_display-box');
let userNameInput = document.getElementById('user-name');
let userAgeInput = document.getElementById('user-age');
let userRateDeliciousInput = document.getElementById('user-rate-delicious');
let userCommentInput = document.getElementById('user-comment-text');
let comments = [];

if (formPresent){
  function displayComments() {
    commentBox.innerHTML = '';

    if (localStorage.getItem('comment')){
      comments = JSON.parse(localStorage.getItem('comment'));
      for (let comment of comments) {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment_display');

        const displayUserName = document.createElement('h6');
        displayUserName.classList.add('comment_user-name');
        displayUserName.textContent = comment.name;

        const displayUserAge = document.createElement('small');
        displayUserAge.classList.add('comment_user-age');
        displayUserAge.textContent = comment.age;

        const displayUserComment = document.createElement('p');
        displayUserComment.classList.add('comment_user-comment');
        displayUserComment.textContent = comment.comment;

        const displayUserRateDelicious = document.createElement('small');
        displayUserRateDelicious.classList.add('comment_user-satisfaction');

        comment.delicious
          ? (displayUserRateDelicious.innerHTML = 'Was it delicious?: <i class="ri-emotion-line"></i>')
          : (displayUserRateDelicious.innerHTML = 'Was it delicious?: <i class="ri-emotion-sad-line"></i>');

        [displayUserName, displayUserAge, displayUserComment, displayUserRateDelicious].forEach(
          (child) => {
            commentContainer.appendChild(child);
          }
        );

        commentBox.prepend(commentContainer);
      }
    }
  }

  displayComments();

  submitBtn.addEventListener('click', () => {
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment_display');

    // USERNAME
    let userName = userNameInput.value;

    const displayUserName = document.createElement('h6');
    displayUserName.classList.add('comment_user-name');

    displayUserName.textContent = userName;
    userNameInput.value = '';

    // AGE
    let userAge = userAgeInput.value;
    
    const displayUserAge = document.createElement('small');
    displayUserAge.classList.add('comment_user-age');

    displayUserAge.textContent = userAge;
    userAgeInput.value = '';

    //TEXT COMMENT
    let userComment = userCommentInput.value;

    const displayUserComment = document.createElement('p');
    displayUserComment.classList.add('comment_user-comment');

    displayUserComment.textContent = userComment;
    userCommentInput.value = '';

    //DELICIOUS RECIPE
    let userRateDelicious = userRateDeliciousInput.checked

    const displayUserRateDelicious = document.createElement('small');
    displayUserRateDelicious.classList.add('comment_user-satisfaction');

    userRateDelicious 
      ? displayUserRateDelicious.innerHTML = 'Was it delicious?: <i class="ri-emotion-line"></i>' 
      : displayUserRateDelicious.innerHTML = 'Was it delicious?: <i class="ri-emotion-sad-line"></i>';

    //APPENDING TO CONTAINER
    [displayUserName, displayUserAge, displayUserComment, displayUserRateDelicious].forEach(child => {
      commentContainer.appendChild(child);
    });

    commentBox.appendChild(commentContainer);


    let commentData = {
      'name': userName,
      'age': userAge,
      'comment': userComment,
      'delicious': userRateDelicious
    }

    comments.push(commentData);
    localStorage.setItem('comment', JSON.stringify(comments));

    displayComments();

    //SCROLL BEHAVIOR
    const firstContainer = document.querySelector('.comment_display');
    if (firstContainer){
      firstContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    displayComments();
    displayCommentCount();
  });

//// ##################### COMMENT COUNT ##################
  function displayCommentCount() {
    const totalComments = comments.length;
    const commentCountDisplay = document.getElementById('comment-count');
    
    if (commentCountDisplay){
      commentCountDisplay.textContent = `(${totalComments})`;
    }
  }

  window.addEventListener('load', () => {
    displayCommentCount();
  });

}

//// ##################### PRINTING BUTTON ##################
const printBtn = document.getElementById('print-btn');

if (printBtn){
  printBtn.addEventListener('click', () => {
    window.print();
  })
}