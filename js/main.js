// Slider
const btnSlideLeft = document.querySelector('#slide-left');
const btnSlideRight = document.querySelector('#slide-right');

btnSlideLeft.addEventListener('click', () => {
  document.querySelector('.slider__slides').style.right = '0';
})

btnSlideRight.addEventListener('click', () => {
  document.querySelector('.slider__slides').style.right = '100%';
})

// Overlay
const overlay = document.querySelector('.overlay');
const hamburger = document.querySelector('#hamburger-menu');
const body = document.body;

const links = document.querySelectorAll('.overlay .menu__link');

links.forEach((element) => {
  element.addEventListener('click',  toggleMenu);
})

function toggleMenu(element) {
  element.preventDefault();
  overlay.classList.toggle('overlay--active');
  hamburger.classList.toggle('hamburger--active');
  body.classList.toggle('body--active-menu');
}

hamburger.addEventListener('click',  toggleMenu);