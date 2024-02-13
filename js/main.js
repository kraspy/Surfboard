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


// Team section
const teamTitles = document.querySelectorAll('.team__title');

teamTitles.forEach((element) => {
  element.addEventListener('click', () => {
    element.classList.toggle('team__title--active');
  })
})


// Owl carousel
$(document).ready(function(){
  var owl = $(".owl-carousel").owlCarousel({
    'items': 1,
    'mouseDrag': false,
    'dots': true,
    'dotsEach': true,
    'dotsContainer': '.review-selector__list',
  });

  owl.on('changed.owl.carousel', function(event) {
    var currentItem = event.item.index; // Получаем индекс текущего активного слайда

    $('.review-selector__item').removeClass('review-selector__item--active');

    $('.review-selector__list .review-selector__item').eq(currentItem).addClass('review-selector__item--active');
  });

  $('.review-selector__link').click(function(e) {
    e.preventDefault();
    e.target.classList.toggle('team__title--active');
    var index = $(this).closest('.review-selector__item').index();
    owl.trigger('to.owl.carousel', [index, 300]);
  });
});

