// ##################### VARIABLES ##################
const logIn = document.getElementById('log-in');
const wrapper = document.querySelector('.wrapper');
const closeBtn = document.getElementById('close');
const emailInput = document.querySelector('.input_email');
const passwordInput = document.querySelector('.input_password');
const iconEmail = document.querySelector('.icon_email');
const iconPassword = document.querySelector('.icon_password');
const eye = document.getElementById('eye');
console.log('Eye: ', eye)

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