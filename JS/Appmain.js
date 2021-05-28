//  Header
const headerBG = document.querySelector('#headerBackground') // header background
const Header = document.querySelector('header'); // main header 
// navigation bar burger button 
const navBtn = document.querySelector('.navBurgerBtn');
// navigation full screen
const mainNav = document.querySelector('.mainNav'); 
// Title Name 

// social aside links 
const socialAsideLinks = document.querySelectorAll('.Social-fixed-aside a');
const socialAside = document.querySelector('.Social-fixed-aside');
const titleName = document.querySelector('.titleName');
// navigation bar pages links 
const navLinks =document.querySelectorAll('.navLinksList li');

const getInTouchHeaderBtn = document.querySelector('#navBtnGetInTouch');

const footer = document.querySelector('.mainFooter');
const copyRightText = document.querySelector('#copyRight');



// function 
window.onscroll = function () {
  scrollRotate();
};

function scrollRotate() {
  // logo back circuit 
  const LogoRotate = document.querySelector('#Logo_x5F_circuits');
  let offsetY = window.pageYOffset/35; 
  LogoRotate.style = ` transform:rotate(${offsetY}deg); transform-origin: 40% 40%;`;
}
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


     // tablet size 
     titleName.classList.toggle('JSApplyTitleName');


     // tablet and mobile size display social links aside fade in animation
     socialAside.classList.toggle('JSlinksVisible'); // display the list holder
     socialAsideLinks.forEach((link, index) =>{ // fade in each link individually 
      if(link.style.animation)
      {
        link.style.animation =''
      }
      else
      {
        if(screen.width <= 500)
        {
        link.style.animation = `AsideLinksFadeAnim 0.5s linear forwards ${index / 3 + 1.2}s`
        link.style.animationDelay =`${index / 4 + 0.1}s`;
        }
      }
    });
     // change title name color when the main nav is intersecting 
     titleName.classList.toggle('headerIntersectingNav');

     
});

window.addEventListener('resize', ()=>{
   
  if(screen.width <= 350)
  {
    copyRightText.textContent = "© 2021–Today / Copyright John Muller";
    copyRightText.style = `text-align:center; transform:translate(20%, -20%);`;
  }
  else
  {
    // not declared 
    copyRightText.textContent = "© 2021–Today / Copyright John Muller . All rights reserved. ";
    copyRightText.style = `text-align:center;`;
  }
  });


getInTouchHeaderBtn.addEventListener('click', ()=>{

  navBtn.click(); // PerformClick to close the navigation bar 

});

const options = {
  rootMargin:"-10px 0px 0px 0px"
};


// Timer count down 
const countDown = () => {
  
  let countDate = new Date('June 15, 2021 00:00:00').getTime();
  let Now = new Date().getTime();
  let Gap = countDate - Now;

  let second = 1000;
  let minute = second * 60;
  let hour   = minute * 60;
  let day    = hour * 24;

  let textday    = Math.floor(Gap/ day);
  let texthour   = Math.floor((Gap % day)   / hour);
  let textminute = Math.floor((Gap % hour)  / minute);
  let textsecond = Math.floor((Gap % minute)/ second);

  document.querySelector('#Day1').innerText = textday;
  document.querySelector('#Hour1').innerText = texthour;
  document.querySelector('#Minute1').innerText  = textminute;
  document.querySelector('#Second1').innerText  = textsecond;
  document.querySelector('svg [node-id="itemdat-1"]').closest('svg').
  querySelector('text').textContent=textsecond;
};


setInterval(countDown, 1000);




// Entry header || Top part 
/* const observer = new IntersectionObserver (function(entries, observer)
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
observer.observer(footer); */
/* 
const OnScroll = new IntersectionObserver (function(entries, OnScroll) {

  entries.forEach(entry => {
      if (!entry.isIntersecting){
              return; 
          }else{ entry.target.classList.add("HeaderBackColor");
          onscroll.unobserve(entry.target);
      }
  });
},
appearOptions);

FadeOnScroll.forEach(fadeOn => {
    OnScroll.observe(fadeOn);
})  */





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