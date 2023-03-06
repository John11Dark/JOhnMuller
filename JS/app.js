"use strict";

import routes from "./routes.js";

// ? * --> Variables
const platform = navigator.platform;
const userModePreference = window.matchMedia("(prefers-color-scheme: Dark)");
const ColorSchemeMetaTag = document.querySelector("meta[name=color-scheme]");
const today = new Date();
const config = { rootMargin: "0px 0px 100px 0px" };
const topObserverConfig = { rootMargin: "0px 0px 0px 0px" };
let beforeScrollTop = 0;
const accentColor = "#eaa244";
let tileColor = "#171311";
const THEME = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : userModePreference.matchesS
  ? "dark"
  : "light";

// ? * --> DOM Elements

const body = document.body;
const header = document.querySelector("header");
const menu = document.querySelector("#mainMenu");
const navSvgButton = document.querySelector(".navSvgButton");
const sideNavigation = document.querySelector(".sideNavigation");
const themeButton = document.querySelector("#themeButton");
const themeIcon = document.querySelector("#themeIconLink");
const tileColorList = document.querySelectorAll("meta[tile-control]");
const logo = document.querySelector("#mainLogo");
const scrollDownButton = document.querySelector(".scrollIcon");
const ageElement = document.querySelector("#age");
const heroSection = document.querySelector("#heroSection");
const redirectButtons = document.querySelectorAll("button[href]");
const goToTopButton = document.querySelector("[go-top-button]");
const navButton = document.querySelector("#navButton");
const navLinks = document.querySelectorAll(".link");
const logos = document.querySelectorAll(".Logo");

//
const whyChoosingList = document.querySelector(".wys-list");
const whyChoosingListElements = document.querySelectorAll(".wys-list-order");
const whyChoosingListIndicators = document.querySelectorAll(".wys-indicators");
//
const whatICanDoList = document.querySelector(".cds-cards");
const whatICanDoListElements = document.querySelectorAll(".cds-card");
const whatICanDoListIndicators = document.querySelectorAll(
  ".cds-card-indicators"
);

//
const plansList = document.querySelector(".pls-cards");
const plansListElements = document.querySelectorAll(".pls-card");
const plansListIndicators = document.querySelectorAll(".pls-indicators");

const abbreviationsList = document.querySelectorAll("abbr");
// ? * --> Functions

const usernameInputField = document.querySelector("#username");
const topicInputField = document.querySelector("#topic");
const emailInputField = document.querySelector("#email");
const messageInputField = document.querySelector("#body");

function inputControls(inputField, fieldLabel) {
  if (inputField.value.length <= 0)
    fieldLabel.setAttribute("hasContent", false);
  if (inputField.value.length >= 1) fieldLabel.setAttribute("hasContent", true);
}

export function redirect(url) {
  window.location.href = `${window.origin}${url.slice(1)}`;
}

function setTheme(theme) {
  // the web app will be set to user defaults mode using Html and css and or local storage if the user has visited the site before
  const currentTheme = theme ?? themeButton.getAttribute("currentMode");
  const root = document.documentElement;
  if (currentTheme === "dark") {
    root.style.setProperty("--background-color", "#fcf6db");
    root.style.setProperty("--theme-shadow", "#b9b5ab8a");
    root.style.setProperty("--surface-light", "#c9c2a6");
    root.style.setProperty("--surface-gray", "#b4b3b1");
    root.style.setProperty("--surface-grayish", "#131212");
    root.style.setProperty("--surface-dark", "#928c86");
    root.style.setProperty("--primary-color-dark", "#fcf6db");
    root.style.setProperty("--primary-color-light", "#11100e");
    root.style.setProperty("--opacity-dark-100", "#11100ed7");
    root.style.setProperty("--opacity-light-100", "#141212c4");
    tileColor = "#fcf6db";
    document.body.style = `color-scheme: light dark; transition: all 1s ease-in-out;`;
    ColorSchemeMetaTag.setAttribute("content", "light dark");
    // themeIcon.setAttribute("xlink:href", "#LIGHT-MODE-ICON");
    // logos.forEach((logo) => {
    //   logo.src = `/Assets/DarkEnginesLibraryLogoDark.png`;
    // });
  } else if (currentTheme === "light") {
    root.style.setProperty("--background-color", "#171311");
    root.style.setProperty("--theme-shadow", "#b9b5ab8a");
    root.style.setProperty("--surface-light", "#e5dfc6");
    root.style.setProperty("--surface-gray", "#b4b3b1");
    root.style.setProperty("--surface-grayish", "#d8d6d1");
    root.style.setProperty("--surface-dark", "#928c86");
    root.style.setProperty("--primary-color-dark", "#11100e");
    root.style.setProperty("--primary-color-light", "#fcf6db");
    root.style.setProperty("--opacity-dark-100", "#11100ed7");
    root.style.setProperty("--opacity-light-100", "#ffffff26");
    tileColor = "#171311";
    document.style = `color-scheme: dark light; transition: all 1s ease-in-out;`;
    ColorSchemeMetaTag.setAttribute("content", "dark light");
    // logos.forEach((logo) => {
    //   logo.src = `/Assets/DarkEnginesLibraryLogoLight.png`;
    // });
    // themeIcon.setAttribute("xlink:href", "#DARK-MODE-ICON");
  }

  // if (!userModePreference.matches) {
  //   linkIcon.href = "/Assets/DarkEnginesLibraryLogoDark.png";
  // } else {
  //   linkIcon.href = "/Assets/DarkEnginesLibraryLogoLight.png";
  // }

  // const path = document.querySelector("#themeIconPath");
  // const SUN_SVG_PATH = "M32.5,0A32.5,32.5,0,1,1,0,32.5,32.5,32.5,0,0,1,32.5,0Z";

  // const MOON_SVG_PATH =
  //   "M32.5,0c17.949,0-20.258,10.871-8.048,38.881S50.449,65,32.5,65a32.5,32.5,0,0,1,0-65Z";
  // themeSwitch.addEventListener("pointerover", () => {
  //   if (path.getAttribute("theme") === "dark") {
  //     path.setAttribute("d", SUN_SVG_PATH);
  //     path.setAttribute("theme", "light");
  //   } else {
  //     path.setAttribute("d", MOON_SVG_PATH);
  //     path.setAttribute("theme", "dark");
  //   }
  // });

  themeButton.setAttribute(
    "currentMode",
    `${currentTheme === "dark" ? "light" : "dark"}`
  );

  ColorSchemeMetaTag.setAttribute(
    "content",
    `
        ${currentTheme === "dark" ? "dark light" : "light dark"}`
  );
  document.body.style.colorScheme = `${
    currentTheme === "dark" ? "dark light" : "light dark"
  }`;
  localStorage.setItem("theme", currentTheme);
  header.style = ` transition: all 0.75s ease-in-out;`;
}

// ? * --> Instance
const observerConfig = { rootMargin: "0px 0px 0px 0px" };

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      header.setAttribute("isInteracting", false);
      if (goToTopButton) goToTopButton.setAttribute("go-top-button", false);
      return;
    }

    header.setAttribute("isInteracting", true);
    if (goToTopButton) goToTopButton.setAttribute("go-top-button", true);
  });
}, observerConfig);

// function headerObserver() {
//   let currentScrollTop = window.scrollY || document.documentElement.scrollTop;
//   header.setAttribute("isIntersecting", true);
//   if (beforeScrollTop < currentScrollTop) {
//     header.style = `opacity: 0.3; height : 2vh;`;
//   } else {
//     header.style = `opacity: 1; height : 10vh;`;
//   }
//   console.log(beforeScrollTop);
//   console.log(currentScrollTop);
//   beforeScrollTop = currentScrollTop;
//   if (beforeScrollTop <= 0 && currentScrollTop <= 0) {
//     header.setAttribute("isIntersecting", false);
//   }
// }

// tab indicator

function tabListIndicators(indicator, index, list) {
  {
    const isActive = indicator.getAttribute("active");

    if (isActive === "true") return;
    else {
      list[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }
}

// is slide observing

function isSlideObserving(isIntersecting, target, elementName, indicatorsList) {
  console.log("is slide", target);
  const isObserving = target.getAttribute("isObserving");
  const currentSlide = document.querySelector(
    `.${elementName}[isObserving="true"]`
  );
  const activeIndicator = parseInt(currentSlide.getAttribute("index"));
  if (isObserving === "true") return;
  else if (isIntersecting === true && isObserving === "false") {
    const targetIndex = parseInt(target.getAttribute("index"));
    currentSlide.setAttribute("isObserving", false);
    target.setAttribute("isObserving", true);
    indicatorsList[activeIndicator].setAttribute("active", false);
    indicatorsList[targetIndex].setAttribute("active", true);
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
    isSlideObserving(
      isIntersecting,
      target,
      "wys-list-order",
      whyChoosingListIndicators
    );
  });
}, config);
// TODO : Fix the observer so it does not have two instance for the same thing
const observerTwo = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isSlideObserving(
      isIntersecting,
      target,
      "cds-card",
      whatICanDoListIndicators
    );
  });
}, config);

const observerThree = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isSlideObserving(isIntersecting, target, "pls-card", plansListIndicators);
  });
}, config);

const sectionObserver = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isIntersecting === true && target.getAttribute("isObserving") === "false"
      ? target.setAttribute("isObserving", true)
      : target.setAttribute("isObserving", false);
    console.log(target);
  });
}, topObserverConfig);

// ? * --> Event Listeners

// * -->  input

usernameInputField.addEventListener("input", () =>
  inputControls(usernameInputField, usernameInputField.labels[0])
);
topicInputField.addEventListener("input", () =>
  inputControls(topicInputField, topicInputField.labels[0])
);
emailInputField.addEventListener("input", () =>
  inputControls(emailInputField, emailInputField.labels[0])
);
messageInputField.addEventListener("input", () =>
  inputControls(messageInputField, messageInputField.labels[0])
);

// ? * --> Pointerdown (Click)

whyChoosingListIndicators.forEach((indicator, index) => {
  indicator.addEventListener("pointerdown", () =>
    tabListIndicators(indicator, index, whyChoosingListElements)
  );
});

whatICanDoListIndicators.forEach((indicator, index) => {
  indicator.addEventListener("pointerdown", () =>
    tabListIndicators(indicator, index, whatICanDoListElements)
  );
});

plansListIndicators.forEach((indicator, index) => {
  indicator.addEventListener("pointerdown", () =>
    tabListIndicators(indicator, index, plansListElements)
  );
});

themeButton.addEventListener("pointerdown", () => setTheme());

logo.addEventListener("pointerdown", () => {
  window.location.href = `${window.origin}${routes.INDEX.slice(1)}`;
});

redirectButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    redirect(button.getAttribute("href"));
  });
});

navButton.addEventListener("pointerdown", () => {
  const isExpanded = navButton.getAttribute("isToggled");
  if (isExpanded === "false") {
    navButton.setAttribute("isToggled", true);
    menu.setAttribute("visible", true);
    menu.setAttribute("aria-expanded", true);
    document.body.setAttribute("isObserving", false);
    tileColorList.forEach((content) => {
      content.setAttribute("content", accentColor);
    });
  } else if (isExpanded === "true") {
    navButton.setAttribute("isToggled", false);
    menu.setAttribute("visible", false);
    menu.setAttribute("aria-expanded", false);
    document.body.setAttribute("isObserving", true);
    tileColorList.forEach((content) => {
      content.setAttribute("content", tileColor);
    });
  }
  // navigation Links animation

  navLinks.forEach((link, index) => {
    link.setAttribute("animation", true);
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinksFadeAnim 0.5s  forwards ${
        index / 3 + 1.5
      }s`;
      link.style.animationDelay = `${index / 3 + 0.5}s`;
    }
  });
});

// ? * --> Scroll Events

// header

// What i can do list
// whatICanDoList.addEventListener("scroll", () => {
//   whatICanDoListElements.forEach((element) => {
//     observerTwo.observe(element);
//   });
// });

// Why choosing list
// whyChoosingList.addEventListener("scroll", () => {
//   whyChoosingListElements.forEach((element) => {
//     observer.observe(element);
//   });
// });

// Plans list
// plansList.addEventListener("scroll", () => {
//   plansListElements.forEach((element) => {
//     observerThree.observe(element);
//   });
// });

abbreviationsList.forEach((abbr) => {
  abbr.addEventListener("pointerdown", () => {
    abbr.classList.add("visible");
  });
});

const root = document.documentElement;
const navigationHight = header.offsetHeight;
root.style.setProperty(
  "----scrollPadding",
  Math.round(navigationHight - 1) + "px"
);

if (heroSection != null) headerObserver.observe(heroSection);

const appointmentPickerForm = document.querySelector("[cos-illustration]");
const appointmentPickerButton = document.querySelector(
  "#showAppointmentPicker"
);
const contactForm = document.querySelector("[cos-email-form]");
const contactFormButton = document.querySelector("#showContactForm");

contactFormButton.addEventListener("pointerdown", () => {
  const visible = contactForm.getAttribute("visible") === "true";
  contactForm.setAttribute("visible", !visible);
  appointmentPickerForm.setAttribute("visible", visible);
});
