//  Header
const headerBG = document.querySelector('#headerBackground') // header background
const Header = document.querySelector('header'); // main header 
// navigation bar burger button 
const navBtn = document.querySelector('.navBurgerBtn');
// navigation full screen
const mainNav = document.querySelector('.mainNav'); 
// Title Name 
const titleName = document.querySelector('.titleName');
// navigation bar pages links 
const navLinks =document.querySelectorAll('.navLinksList li');

const getInTouchHeaderBtn = document.querySelector('#navBtnGetInTouch');

const footer = document.querySelector('.mainFooter');




// When burger btn click 
navBtn.addEventListener('click', ()=>{
    
    // navigation Links animation 
    navLinks.forEach((link, index) =>{
      if(link.style.animation){
        link.style.animation =''
      }
    
      else{
        link.style.animation = `navLinksFadeAnim 0.5s ease forwards ${index / 3 + 1.5}s`
        link.style.animationDelay =`${index / 3 + 0.5}s`;
      }
        });
 
       // set navigation bar to transparent background
     Header.classList.toggle('headerInteractingNav');
       // Change button to close button
     navBtn.classList.toggle('closeBtnJS');
       //
     navBtn.classList.toggle('hoverClickJS');
     mainNav.classList.toggle('clipJSApply');
     // change title name color when the main nav is intersecting 
     titleName.classList.toggle('headerIntersectingNav');
     
});


getInTouchHeaderBtn.addEventListener('click', ()=>{

  navBtn.click(); // PerformClick to close the navigation bar 

});

const options = {
  rootMargin:"-10px 0px 0px 0px"
};

// Entry header || Top part 
const observer = new IntersectionObserver (function(entries, observer)
{
entries.forEach(entry => {
      if (!entry.isIntersecting){
        headerBG.style.display = `none`;
        titleName.classList.toggle('headerIntersectingNav');

      }else{
          header.style.display = `block`; 
          titleName.classList.remove('headerIntersectingNav');
      }
  });

},
options);
observer.observer(footer);

const OnScroll = new IntersectionObserver (function(entries, OnScroll) {

  entries.forEach(entry => {
      if (!entry.isIntersecting){
              return; 
          }else{ entry.target.classList.add("HeaderbackColor");
          onscroll.unobserve(entry.target);
      }
  });
},
appearOptions);

FadeOnScroll.forEach(fadeOn => {
    OnScroll.observe(fadeOn);
}) 





/* function sendEmail(){
  let username = document.querySelector('#Name');
  let Email = document.querySelector('#Email');
  let Subject = document.querySelector('#Subject');
  let TextBody = document.querySelector('#Body');

  if (isNotEmpty(Subject) && isNotEmpty(Body)){

  }
  function isNotEmpty(caller) {
    if (caller.val() == "")
  }
} */