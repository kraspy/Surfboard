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

function closeAllTeamTitles(current_element) {
  teamTitles.forEach((element) => {
    if ( element === current_element) {
      return
    }
    element.closest('.team__title').classList.remove('team__item--active');
  })
}

teamTitles.forEach(element => {
  element.addEventListener('click', function() {
    closeAllTeamTitles(this);
    element.closest('.team__item').classList.toggle('team__item--active');
  })
})


// Owl carousel :: Reviews
$(document).ready(function(){
  var owl = $(".owl-carousel").owlCarousel({
    'items': 1,
    'mouseDrag': false,
    'dots': true,
    'dotsEach': true,
    'dotsContainer': '.review-selector__list',
  });

  owl.on('changed.owl.carousel', function(event) {
    var currentItem = event.item.index;

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


// Modal
modal = document.querySelector('#modal');
btnCloseModal = document.querySelector('#closeModal');
btnCloseModal.onclick = () => {
  modal.style.display = "none";
}

function showModal(message, color) {
  modal.style.display = "flex";
  const messageField = modal.querySelector('.modal__message')
  messageField.innerHTML = message;
  messageField.style.color = color;
}

// modalTrigger.addEventListener("click", function () {
//     modalBackground.style.display = "flex";
// });


// Form
const orderForm = document.querySelector('#orderForm');
const sumbitBtn = orderForm.querySelector('#submit');
const ADMIN_EMAIL = 'admin@example.com';

sumbitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (validateForm(orderForm)) {
    const json_data = JSON.stringify({
      name: orderForm['name'].value,
      phone: orderForm['phone'].value,
      comment: orderForm['comment'].value,
      to: ADMIN_EMAIL
    })

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(json_data);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 400) {
        showModal(xhr.response.message, 'red');
      } else {
        showModal(xhr.response.message, 'green');
        orderForm.reset();
      }
    })

  }
})

function validateForm(form) {
  let form_is_valid = true;

  const required_form_fields = form.querySelectorAll('[required]');
  resetFieldsStyle(required_form_fields);

  for (const field of required_form_fields) {
    if (!validateField(field)) {
      form_is_valid = false;
    }
  }

  return form_is_valid
}

function validateField(field) {
  if(field.checkValidity()) {

    return true;
  } else {
    form = field.closest('.form');
    field_label = form.querySelector(`label[for="${field.id}"]`);
    field_label.style.color = 'red';

    return false;
  }
}

function resetFieldsStyle(fields) {
  for (const field of fields) {
    field_label = field.previousElementSibling;
    field_label.removeAttribute('style');
  }
}


// Horizontal menu
const goodsList = document.querySelector('.goods__items');

// close all items
function remove_class_from_all_items() {
  goodsList.querySelectorAll('.goods__item').forEach(item => {
    item.classList.remove('goods__item--active');
  })
}

goodsList.addEventListener('click', (e) => {
  let TARGET_TAG_NAME = 'a';
  let link = e.target.closest('.goods__link');
  if (link) {
    e.preventDefault();
    let currentGoodsItem = link.closest('.goods__item');
    if (currentGoodsItem.classList.contains('goods__item--active')) {
      currentGoodsItem.classList.remove('goods__item--active');
      return;
    }
    remove_class_from_all_items();
    let goodsItem = link.closest('.goods__item');
    goodsItem.classList.toggle('goods__item--active');
  }

  if (e.target.tagName === TARGET_TAG_NAME) {
    console.log('prevented');
    e.preventDefault();
  }
  
  
	// for (tab of colorsName) {
	// 	if (e.target === tab || e.target === tab.childNodes[1] || tab.parentNode.classList.contains('goods__item--active"')) {
	// 		tab.parentNode.classList.toggle('goods__item--active"');
	// 	}
	// }
});

