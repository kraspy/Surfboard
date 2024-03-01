// Slider
const btnSlideLeft = document.querySelector('#slide-left');
const btnSlideRight = document.querySelector('#slide-right');

btnSlideLeft.addEventListener('click', () => {
  document.querySelector('.slider__slides').style.right = '0';
});

btnSlideRight.addEventListener('click', () => {
  document.querySelector('.slider__slides').style.right = '100%';
});


// Overlay
const overlay = document.querySelector('.overlay');
const hamburger = document.querySelector('#hamburger-menu');
const body = document.body;

const links = document.querySelectorAll('.overlay .menu__link');

links.forEach((element) => {
  element.addEventListener('click', toggleMenu);
});

function toggleMenu(element) {
  element.preventDefault();
  overlay.classList.toggle('overlay--active');
  hamburger.classList.toggle('hamburger--active');
  body.classList.toggle('body--active-menu');
}

hamburger.addEventListener('click', toggleMenu);


// Team section
const teamTitles = document.querySelectorAll('.team__title');

function closeAllTeamTitles(current_element) {
  teamTitles.forEach((element) => {
    if (element === current_element) {
      return;
    }
    element.closest('.team__title').classList.remove('team__item--active');
  });
}

teamTitles.forEach((element) => {
  element.addEventListener('click', function () {
    closeAllTeamTitles(this);
    element.closest('.team__item').classList.toggle('team__item--active');
  });
});


// Owl carousel :: Reviews
$(document).ready(function () {
  var owl = $('.owl-carousel').owlCarousel({
    items: 1,
    mouseDrag: false,
    dots: true,
    dotsEach: true,
    dotsContainer: '.review-selector__list',
  });

  owl.on('changed.owl.carousel', function (event) {
    var currentItem = event.item.index;

    $('.review-selector__item').removeClass('review-selector__item--active');

    $('.review-selector__list .review-selector__item')
      .eq(currentItem)
      .addClass('review-selector__item--active');
  });

  $('.review-selector__link').click(function (e) {
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
  modal.style.display = 'none';
};

function showModal(message, color) {
  modal.style.display = 'flex';
  const messageField = modal.querySelector('.modal__message');
  messageField.innerHTML = message;
  messageField.style.color = color;
}

// modalTrigger.addEventListener('click', function () {
//     modalBackground.style.display = 'flex';
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
      to: ADMIN_EMAIL,
    });

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
    });
  }
});

function validateForm(form) {
  let form_is_valid = true;

  const required_form_fields = form.querySelectorAll('[required]');
  resetFieldsStyle(required_form_fields);

  for (const field of required_form_fields) {
    if (!validateField(field)) {
      form_is_valid = false;
    }
  }

  return form_is_valid;
}

function validateField(field) {
  if (field.checkValidity()) {
    return true;
  } else {
    form = field.closest('.form');
    field_label = form.querySelector(`label[for='${field.id}']`);
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
  goodsList.querySelectorAll('.goods__item').forEach((item) => {
    item.classList.remove('goods__item--active');
  });
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
});


// Player
let player;
const playerContainer = $('.player');
const playerStart = $('.player__start');

let eventsInit = () => {
  $('.player__start').click((e) => {
    e.preventDefault();

    if (playerContainer.hasClass('paused')) {
      playerContainer.removeClass('paused');
      playerStart.removeClass('player__start-pause');
      player.pauseVideo();
    } else {
      playerContainer.addClass('paused');
      playerStart.addClass('player__start-pause');
      player.playVideo();
    }
  });

  $('.player__playback').click((e) => {
    const barWidth = $('.player__playback').width();
    const newButtonPosition = e.originalEvent.layerX;
    const newPlaybackPosition = (newButtonPosition / barWidth) * 100;
    $('.player__playback-button').css({
      left: `${newPlaybackPosition}%`,
    });
    $('.player__playback-cur').css({
      width: `${newPlaybackPosition}%`,
    });
    player.seekTo(newPlaybackPosition * player.getDuration() * 0.01);
  })
};

function formatTime(sec) {
  let min = Math.floor(sec / 60);
  let secLeft = sec % 60;
  min = min < 10 ? '0' + min : min;
  secLeft = secLeft < 10 ? '0' + parseInt(secLeft) : parseInt(secLeft);
  return min + ':' + secLeft;
}

function onPlayerReady(event) {
  let interval;
  const durationSec = player.getDuration();
  $('.player__all-time').text(formatTime(durationSec));

  

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const timeSec = player.getCurrentTime();
    const completedPercent = (player.getCurrentTime() / durationSec) * 100;

    $('.player__cur-time').text(formatTime(timeSec));
    $('.player__playback-button').css({
      left: `${completedPercent}%`,
    });
  }, 1000);
}



function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '370',
    width: '100%',
    videoId: 'lZ0x7DAwiJU',
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0,
    },
  });
}

eventsInit();


// One Page Scroll
const sections = $('.section');
const display = $('.main-content');
const sideMenu = $('.page-nav');
const menuItems = sideMenu.find('.page-nav__dot');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass('active');

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;

  return position;
};

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr('data-sidemenu-theme');
  const activeClass = 'page-nav--black';

  if (menuTheme == 'black') {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

const resetActiveClassForItem = (item, itemEq, activeClass) => {
  item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = (sectionEq) => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`,
  });

  resetActiveClassForItem(sections, sectionEq, 'active');

  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, 'page-nav__dot--active');
  }, transitionOver + mouseInertiaOver);
};

const viewportScroller = () => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on('wheel', (e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on('keydown', (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == 'input' || tagName == 'textarea';
  const scroller = viewportScroller();

  if (userTypingInInputs) return;
  switch (e.keyCode) {
    case 38:
      scroller.next();
      break;
    case 40:
      scroller.prev();
      break;
  }
});

$('.wrapper').one('touchmove', (e) => e.preventDefault());

$('[data-scroll-to]').click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

if (isMobile) {
  $('body').swipe({
    swipe: function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = '';

      if (direction == 'up') scrollDirection = 'next';
      if (direction == 'down') scrollDirection = 'prev';

      scroller[scrollDirection]();
    },
  });
}


// Map
ymaps.ready(function init() {
  var myMap = new ymaps.Map('map', {
      center: [56.010543, 92.852581],
      zoom: 14,
      controls: []
  });

  var coords = [
      [56.011739, 92.870170],
      [56.015280, 92.893220],
      [56.008650, 92.797610],
      [55.997150, 92.872540]
  ];

  var myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './images/icons/marker.svg',
      iconImageSize: [58, 73],
      iconImageOffset: [-29, -73]
  });

  coords.forEach(function(coord) {
      myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);
  myMap.behaviors.disable('scrollZoom');
});
