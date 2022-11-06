// window.dataLayer=window.dataLayer||[]; function gtag() {dataLayer.push(arguments);} gtag('js',new Date()); gtag('config','UA-684863-8'); 
// ? * --> variables
const platform = navigator.platform;
const userModePreference = window.matchMedia('(prefers-color-scheme: Dark)');
const ColorSchemeMetaTag = document.querySelector('meta[name=color-scheme]');
const today = new Date();
const config = { rootMargin: '0px 0px 100px 0px' };
const topObserverConfig = { rootMargin: '0px 0px 0px 0px' };
let beforeScrollTop = 0;

// ? * --> Dom Elements

const body = document.body;
const header = document.querySelector('header');
const navigation = document.querySelector('.navigationBar');
const navButton = document.querySelector('.navButton');
const navSvgButton = document.querySelector('.navSvgButton');
const sideNavigation = document.querySelector('.sideNavigation');
const themeSwitch = document.querySelector('.modeSwitchButton');
const logo = document.querySelector('.logo');
const scrollDownButton = document.querySelector('.scrollIcon');
const ageElement = document.querySelector('#age');

//
const whyChoosingList = document.querySelector('.wys-list');
const whyChoosingListElements = document.querySelectorAll('.wys-list-order');
const whyChoosingListIndicators = document.querySelectorAll('.wys-indicators');
//
const whatICanDoList = document.querySelector('.cds-cards');
const whatICanDoListElements = document.querySelectorAll('.cds-card');
const whatICanDoListIndicators = document.querySelectorAll(
  '.cds-card-indicators'
);

//
const plansList = document.querySelector('.pls-cards');
const plansListElements = document.querySelectorAll('.pls-card');
const plansListIndicators = document.querySelectorAll(
  '.pls-indicators'
);

const abbreviationsList = document.querySelectorAll('abbr');
// ? * --> Functions

const usernameInputField = document.querySelector('#username');
const topicInputField = document.querySelector('#topic');
const emailInputField = document.querySelector('#email');
const messageInputField = document.querySelector('#body');

function inputControls(inputField, fieldLabel) {
  if (inputField.value.length <= 0)
    fieldLabel.setAttribute('hasContent', false);
  if (inputField.value.length >= 1) fieldLabel.setAttribute('hasContent', true);
}

function navigationToggle() {
  const navigationButtonState = navButton.getAttribute('menuExpanded');
  if (navigationButtonState === 'false') {
    body.setAttribute('isObserving', false);
    navButton.setAttribute('menuExpanded', true);
    navigation.setAttribute('aria-expanded', true);
    navigation.setAttribute('visible', true);
    navSvgButton.setAttribute('expanded', true);

    console.log('Body observing', body.getAttribute('isObserving'));
    console.log('menu button expanded', navButton.getAttribute('menuExpanded'));
    console.log('menu aria expanded', navigation.getAttribute('visible'));
    console.log('menu expanded', navigation.getAttribute('aria-expanded'));
    console.log('svg expanded', navSvgButton.getAttribute('expanded'));
  } else if (navigationButtonState === 'true') {
    body.setAttribute('isObserving', true);
    navButton.setAttribute('menuExpanded', false);
    navigation.setAttribute('aria-expanded', false);
    navigation.setAttribute('visible', false);
    navSvgButton.setAttribute('expanded', false);

    console.log('Body observing', body.getAttribute('isObserving'));
    console.log('menu button expanded', navButton.getAttribute('menuExpanded'));
    console.log('menu aria expanded', navigation.getAttribute('visible'));
    console.log('menu expanded', navigation.getAttribute('aria-expanded'));
    console.log('svg expanded', navSvgButton.getAttribute('expanded'));
  }
}

function headerObserver() {
  let currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  header.setAttribute('isIntersecting', true);
  if (beforeScrollTop < currentScrollTop) {
    header.style = `opacity: 0.3; height : 2vh;`;
  } else {
    header.style = `opacity: 1; height : 10vh;`;
  }
  console.log(beforeScrollTop);
  console.log(currentScrollTop);
  beforeScrollTop = currentScrollTop;
  if (beforeScrollTop <= 0 && currentScrollTop <= 0) {
    header.setAttribute('isIntersecting', false);
  }
}

function logoRotate() {
  return;
}

// set Age
function calcAge(element, dateOfBirth) {
  dateOfBirth = new Date(dateOfBirth).getUTCFullYear();
  let age = today.getUTCFullYear() - dateOfBirth;
  if (age == null) return;
  element.innerText = age;
}

// tab indicator

function tabListIndicators(indicator, index, list) {
  {
    const isActive = indicator.getAttribute('active');

    if (isActive === 'true') return;
    else {
      list[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }
}

// is slide observing

function isSlideObserving(isIntersecting, target, elementName, indicatorsList) {
  console.log("is slide", target);
  const isObserving = target.getAttribute('isObserving');
  const currentSlide = document.querySelector(
    `.${elementName}[isObserving="true"]`
  );
  const activeIndicator = parseInt(currentSlide.getAttribute('index'));
  if (isObserving === 'true') return;
  else if (isIntersecting === true && isObserving === 'false') {
    const targetIndex = parseInt(target.getAttribute('index'));
    currentSlide.setAttribute('isObserving', false);
    target.setAttribute('isObserving', true);
    indicatorsList[activeIndicator].setAttribute('active',false);
    indicatorsList[targetIndex].setAttribute('active', true);
  }
  /**
   * Brief description about is slide observing.
   * @summary ...
   * @param {Boolean} isIntersecting
   * @param {Int} index
   */
}


// ? * --> Instance 

// instance of observer
const observer = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isSlideObserving(isIntersecting, target, "wys-list-order", whyChoosingListIndicators);
  });

}, config);
// TODO : Fix the observer so it does not have two instance for the same thing 
const observerTwo = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isSlideObserving(isIntersecting, target, "cds-card", whatICanDoListIndicators);
  });
}, config);

const observerThree = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isSlideObserving(isIntersecting, target, "pls-card", plansListIndicators);
  });
}, config);


const sectionObserver = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isIntersecting === true && target.getAttribute('isObserving') === 'false'
      ? target.setAttribute('isObserving', true)
      : target.setAttribute('isObserving', false);
    console.log(target) ;
  });
}, topObserverConfig);



// ? * --> Event Listeners

// * -->  Load

document.addEventListener('load', calcAge(ageElement, '2001/3/16'));

usernameInputField.addEventListener('input', () =>
  inputControls(usernameInputField, usernameInputField.labels[0])
);
topicInputField.addEventListener('input', () =>
  inputControls(topicInputField, topicInputField.labels[0])
);
emailInputField.addEventListener('input', () =>
  inputControls(emailInputField, emailInputField.labels[0])
);
messageInputField.addEventListener('input', () =>
  inputControls(messageInputField, messageInputField.labels[0])
);

// ? * -->  Click

navButton.addEventListener('pointerdown', navigationToggle);

whyChoosingListIndicators.forEach((indicator, index) => {
  indicator.addEventListener('pointerdown', () =>
    tabListIndicators(indicator, index, whyChoosingListElements)
  );
});

whatICanDoListIndicators.forEach((indicator, index) => {
  indicator.addEventListener('pointerdown', () =>
    tabListIndicators(indicator, index, whatICanDoListElements)
  );
});

plansListIndicators.forEach((indicator, index) => {
  indicator.addEventListener('pointerdown', () =>
    tabListIndicators(indicator, index, plansListElements)
  );
});

// ? * --> Scroll Events

// header

window.addEventListener('scroll', () => {
  headerObserver();
  logoRotate();
});


// What i can do list
whatICanDoList.addEventListener('scroll', () => {
  whatICanDoListElements.forEach((element,) => {
    observerTwo.observe(element);
  });
});


// Why choosing list
whyChoosingList.addEventListener('scroll', () => {
  whyChoosingListElements.forEach((element) => {
    observer.observe(element);
  });
});

// Plans list
plansList.addEventListener('scroll', () => {
  plansListElements.forEach((element) => {
    observerThree.observe(element);
  });
});


abbreviationsList.forEach((abbr) => {
  abbr.addEventListener('pointerdown', () => {
    abbr.classList.add('visible');
  });
});




















// ? * --> Theme

// the app will be set to user defaults mode using Html and css and or local storage if the user has visited the site before
// but the button needs to be update manually

const THEME = localStorage.getItem('theme')
  ? localStorage.getItem('theme')
  : userModePreference.matches
  ? 'dark'
  : 'light';
themeSwitch.setAttribute('theme', THEME);
localStorage.setItem('theme', THEME);
// when button clicks
themeSwitch.addEventListener('pointerdown', () => {
  const currentTheme = themeSwitch.getAttribute('theme');
  const root = document.documentElement;

  if (currentTheme === 'dark') {
    root.style.setProperty('----primaryColorDark', '#11100e');
    root.style.setProperty('----primaryColor', '#ffffff');
    root.style.setProperty('----primaryColorLight', '#fcf6db');
    root.style.setProperty('----backgroundColor', '#e5dfc6, #0f0f0e');
  } else if (currentTheme === 'light') {
    root.style.setProperty('----primaryColorDark', '#fff');
    root.style.setProperty('----primaryColor', '#000000');
    root.style.setProperty('----primaryColorLight', '#00000');
    root.style.setProperty('----backgroundColor', '#0f0f0e, #171311');
  }
  themeSwitch.setAttribute(
    'theme',
    `${currentTheme === 'dark' ? 'light' : 'dark'}`
  );

  ColorSchemeMetaTag.setAttribute(
    'content',
    `
  ${currentTheme === 'dark' ? 'dark light' : 'light dark'}`
  );
  document.body.style.colorScheme = `${
    currentTheme === 'dark' ? 'dark light' : 'light dark'
  }`;
  localStorage.setItem('theme', currentTheme);
  console.log(currentTheme);
  header.style = ` transition: all 0.75s ease-in-out;`;
});

const root = document.documentElement;
const navigationHight = header.offsetHeight;
root.style.setProperty(
  '----scrollPadding',
  Math.round(navigationHight - 1) + 'px'
);

// test

// const lastSection = document.querySelector('[lastSection]');

// sectionObserver.observe(lastSection);
