"use strict";

import {
  fetchJsonData,
  sleep,
  setDay,
  redirect,
  setTheme,
} from "./functions.js";
import routes from "./routes.js";

const lightThemeColors = {
  "--background-color": "#fcf6db",
  "--theme-shadow": "#b9b5ab8a",
  "--surface-light": "#c9c2a6",
  "--surface-gray": "#b4b3b1",
  "--surface-grayish": "#131212",
  "--surface-dark": "#928c86",
  "--primary-color-dark": "#fcf6db",
  "--primary-color-light": "#11100e",
  "--opacity-dark-100": "#11100ed7",
  "--opacity-light-100": "#141212c4",
};

const darkThemeColors = {
  "--background-color": "#171311",
  "--theme-shadow": "#b9b5ab8a",
  "--surface-light": "#e5dfc6",
  "--surface-gray": "#b4b3b1",
  "--surface-grayish": "#d8d6d1",
  "--surface-dark": "#928c86",
  "--primary-color-dark": "#11100e",
  "--primary-color-light": "#fcf6db",
  "--opacity-dark-100": "#11100ed7",
  "--opacity-light-100": "#ffffff26",
};
// ? * --> Variables
const platform = navigator.platform;
let cached = false;
const ipInfo = await fetchJsonData("https://ipinfo.io?token=3c805bf213b675");
const userModePreference = window.matchMedia("(prefers-color-scheme: Dark)");
const ColorSchemeMetaTag = document.querySelector("meta[name=color-scheme]");
const today = new Date();
const config = { rootMargin: "0px 0px 100px 0px" };
const topObserverConfig = { rootMargin: "0px 0px 0px 0px" };
let beforeScrollTop = 0;
const accentColor = "#eaa244";
let tileColor = "#171311";

let prevDay;
const LIST_MONTHS_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const NUMBER_OF_DAYS = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0
).getDate();
const CURRENT_DAY = today.getDate();
const CURRENT_MONTH = today.getMonth();
let selectedDay = CURRENT_DAY;
let selectedMonth = CURRENT_MONTH;

// ? * --> DOM Elements
const header = document.querySelector("header");
const menu = document.querySelector("#mainMenu");
const themeButton = document.querySelector("#themeButton");
const tileColorList = document.querySelectorAll("meta[tile-control]");
const logo = document.querySelector("#mainLogo");
const body = document.body;
const navSvgButton = document.querySelector(".navSvgButton");
const sideNavigation = document.querySelector(".sideNavigation");
const themeIcon = document.querySelector("#themeIconLink");
const scrollDownButton = document.querySelector(".scrollIcon");
const ageElement = document.querySelector("#age");
const logos = document.querySelectorAll(".Logo");
const heroSection = document.querySelector("#heroSection");
const redirectButtons = document.querySelectorAll("button[href]");
const goToTopButton = document.querySelector("[go-top-button]");
const navButton = document.querySelector("#navButton");
const navLinks = document.querySelectorAll(".link");
const cosIllustrations = document.querySelector("[cos-illustration]");
const appointmentPickerForm = document.querySelector("[cos-meeting-form]");
const contactForm = document.querySelector("[cos-email-form]");

const appointmentPickerButton = document.querySelector(
  "#showAppointmentPicker"
);
const datePickerConfirmButton = document.querySelector(
  "#datePickerConfirmButton"
);
const datePickerCancelButton = document.querySelector(
  "#datePickerCancelButton"
);
const contactFormButton = document.querySelector("#showContactForm");
const whyChoosingList = document.querySelector(".wys-list");
const whyChoosingListElements = document.querySelectorAll(".wys-list-order");
const whyChoosingListIndicators = document.querySelectorAll(".wys-indicators");
const whatICanDoList = document.querySelector(".cds-cards");
const whatICanDoListElements = document.querySelectorAll(".cds-card");
const whatICanDoListIndicators = document.querySelectorAll(
  ".cds-card-indicators"
);
const plansList = document.querySelector(".pls-cards");
const plansListElements = document.querySelectorAll(".pls-card");
const plansListIndicators = document.querySelectorAll(".pls-indicators");

const abbreviationsList = document.querySelectorAll("abbr");
const usernameInputField = document.querySelector("#username");
const topicInputField = document.querySelector("#topic");
const emailInputField = document.querySelector("#email");
const messageInputField = document.querySelector("#body");

const countryCodeSelectOptions = document.querySelector(
  "#countriesCodeOptions"
);
const countryCodeInputOptions = document.querySelector("#countryCode");

// ? Date picker

// ? * --> DOM
const datePickerContainer = document.querySelector("[datePickerContainer]");
const datePickerButton = document.querySelector("[date-picker-button]");
const datePickerControllers = document.querySelectorAll(
  "[datePickerControllers]"
);
const monthLabel = document.querySelector("[monthLabel]");
const selectedDateLabel = document.querySelector("[selectedDate]");
const daysContainer = document.querySelector("[days]");

// ? * --> Functions

function animateCalender(container) {
  container.setAttribute("animate", true);
  sleep(500000);
  container.setAttribute("animate", false);
}

function updateUI(month, days) {
  animateCalender(daysContainer);
  daysContainer.innerHTML = "";
  for (let day = 1; day <= days; day++) {
    const isCurrentDay = day === CURRENT_DAY && month === CURRENT_MONTH;
    const isInThePast = day < CURRENT_DAY && month <= CURRENT_MONTH;
    const isSelected = day === selectedDay;
    const dayElement = document.createElement("p");
    dayElement.classList.add(
      "day",
      "|",
      "clickable",
      "|",
      "clickable",
      "|",
      "date-picker-icon"
    );
    dayElement.setAttribute("selected", isSelected);
    dayElement.setAttribute("value", day);
    dayElement.setAttribute("disabled", isInThePast);
    dayElement.setAttribute("currentDay", isCurrentDay);
    dayElement.innerText = day;
    daysContainer.append(dayElement);
    dayElement.addEventListener("pointerdown", (e) =>
      setSelectedDate(dayElement, e.target)
    );
  }
  monthLabel.innerText = `${
    LIST_MONTHS_NAMES[selectedMonth]
  }, ${today.getFullYear()}`;
}

function setSelectedDate(day, target) {
  if (prevDay) prevDay.setAttribute("selected", false);
  const selected = day.getAttribute("selected") === "true";
  if (selected) {
    day.setAttribute("selected", false);
    selectedDay = today.getDate();
  } else {
    prevDay = target;
    day.setAttribute("selected", true);
    selectedDay = day.getAttribute("value");
  }

  selectedDateLabel.innerText = `${setDay(selectedDay)}, ${
    LIST_MONTHS_NAMES[selectedMonth]
  }, ${today.getFullYear()}`;
}

function inputControls(inputField, fieldLabel) {
  if (inputField.value.length <= 0)
    fieldLabel.setAttribute("hasContent", false);
  if (inputField.value.length >= 1) fieldLabel.setAttribute("hasContent", true);
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

function setupCountryCode(countries, cached) {
  if (countries && !cached) {
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = `${country.code} ${country.dialCode}`;
      option.innerText = `${country.name}`;
      countryCodeSelectOptions.append(option);
      if (country.code.toLowerCase() === ipInfo.country.toLowerCase()) {
        option.setAttribute("selected", true);
        countryCodeInputOptions.value = `${country.code} ${country.dialCode}`;
      }
    });
  }
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

// * -->  setup
const root = document.documentElement;
const navigationHight = header.offsetHeight;
root.style.setProperty(
  "----scrollPadding",
  Math.round(navigationHight - 1) + "px"
);

if (heroSection != null) headerObserver.observe(heroSection);

//  * -->  Input
if (usernameInputField)
  usernameInputField.addEventListener("input", () =>
    inputControls(usernameInputField, usernameInputField.labels[0])
  );
if (topicInputField)
  topicInputField.addEventListener("input", () =>
    inputControls(topicInputField, topicInputField.labels[0])
  );
if (emailInputField)
  emailInputField.addEventListener("input", () =>
    inputControls(emailInputField, emailInputField.labels[0])
  );
if (messageInputField)
  messageInputField.addEventListener("input", () =>
    inputControls(messageInputField, messageInputField.labels[0])
  );

//  * --> Pointerdown (Click)

// ** List of buttons
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

abbreviationsList.forEach((abbr) => {
  abbr.addEventListener("pointerdown", () => {
    abbr.classList.add("visible");
  });
});

redirectButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    redirect(button.getAttribute("href"));
  });
});

themeButton.addEventListener("pointerdown", () => {
  const THEME = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : userModePreference.matches
    ? "dark"
    : "light";
  setTheme(
    THEME,
    themeButton,
    darkThemeColors,
    lightThemeColors,
    ColorSchemeMetaTag,
    tileColor
  );
  header.style = ` transition: all 0.75s ease-in-out;`;
});

logo.addEventListener("pointerdown", () => redirect(routes.INDEX));

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

if (contactFormButton) {
  contactFormButton.addEventListener("pointerdown", () => {
    const visible = contactForm.getAttribute("visible") === "true";
    contactForm.setAttribute("visible", !visible);
    cosIllustrations.setAttribute("visible", visible);
    appointmentPickerForm.setAttribute("visible", false);
  });
}

if (appointmentPickerButton) {
  appointmentPickerButton.addEventListener("pointerdown", () => {
    const visible = appointmentPickerForm.getAttribute("visible") === "true";
    appointmentPickerForm.setAttribute("visible", !visible);
    cosIllustrations.setAttribute("visible", visible);
    contactForm.setAttribute("visible", false);
    fetchJsonData("../Assets/Data/countriesCode.json").then((data) => {
      setupCountryCode(data, cached);
      cached = true;
    });
    selectedDateLabel.innerText = `${setDay(selectedDay)}, ${
      LIST_MONTHS_NAMES[selectedMonth]
    }, ${today.getFullYear()}`;

    datePickerControllers.forEach((controller) => {
      controller.addEventListener("pointerdown", () => {
        const value = controller.getAttribute("datePickerControllers");
        if (selectedMonth > CURRENT_MONTH && value === "previous") {
          selectedMonth--;
          console.log(selectedMonth);
          animateCalender(daysContainer);
        } else if (selectedMonth < 11 && value === "next") {
          selectedMonth++;
          console.log(selectedMonth);
          animateCalender(daysContainer);
        }
        const numberOfDays = new Date(
          today.getFullYear(),
          selectedMonth + 1,
          0
        ).getDate();
        updateUI(selectedMonth, numberOfDays);
      });
    });

    updateUI(selectedMonth, NUMBER_OF_DAYS);

    datePickerButton.addEventListener("pointerdown", () => {
      const visible = datePickerContainer.getAttribute("visible") === "true";
      datePickerContainer.setAttribute("visible", !visible);
      datePickerContainer.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
      });
    });
    datePickerCancelButton.addEventListener("pointerdown", () => {
      datePickerContainer.setAttribute("visible", false);
      datePickerContainer.removeEventListener("pointerdown", (e) => {
        e.stopPropagation();
      });

      selectedDateLabel.innerText = `${setDay(CURRENT_DAY)}, ${
        LIST_MONTHS_NAMES[CURRENT_MONTH]
      }, ${today.getFullYear()}`;
    });

    datePickerConfirmButton.addEventListener("pointerdown", () => {
      datePickerContainer.setAttribute("visible", false);
      datePickerContainer.removeEventListener("pointerdown", (e) => {
        e.stopPropagation();
      });
    });
  });
}

//  * --> Scroll Events

// ** What i can do list
if (whatICanDoList) {
  whatICanDoList.addEventListener("scroll", () => {
    whatICanDoListElements.forEach((element) => {
      observerTwo.observe(element);
    });
  });
}

// ** Why choosing list
if (whyChoosingList) {
  whyChoosingList.addEventListener("scroll", () => {
    whyChoosingListElements.forEach((element) => {
      observer.observe(element);
    });
  });
}

// ** Plans list
if (plansList) {
  plansList.addEventListener("scroll", () => {
    plansListElements.forEach((element) => {
      observerThree.observe(element);
    });
  });
}
