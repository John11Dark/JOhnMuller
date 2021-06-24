//  Header
 const Header = document.querySelector('header'); // main header 
 let befScrollTop = 0;
 // navigation bar burger button 
const navBtn = document.querySelector('.navBurgerBtn');
// navigation full screen
const mainNav = document.querySelector('.mainNav'); 
const mainNavAnim = document.querySelector('.mainNavAnim');
const timerText = document.querySelector('.timerText');
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


/* const imagesProjectList = document.getElementsByClassName('') 
 *//* const elements = document.getElementsByClassName('.collectionOfProjects '[0,9]);

 elements.addEventListener('click', ()=>{
   elements[0].style = `transform:scale(5);`;
 }) */


// on scroll rotate Logo circuit 
window.onscroll = ('onscroll', ()=> {// logo back circuit 
  const LogoRotate = document.querySelector('#Logo_x5F_circuits');
  let offsetY = window.pageYOffset/35; 
  LogoRotate.style = ` transform:rotate(${offsetY}deg); transform-origin: center;`;
}); 

Header.addEventListener('onHover', ()=>{
Header.style = `opacity:1;`
});

window.addEventListener('scroll', ()=>{

  let curScrollTop = window.scrollY || document.documentElement.scrollTop;

  if ( befScrollTop < curScrollTop)
  {
    Header.style = `opacity: 0.2;`;
    Header.addEventListener('hover', ()=>{
      Header.style = `opacity: 1;`;
    });
  }
  else 
  {
    Header.style = `opacity: 1;`;
  }
  console.log(befScrollTop);
  console.log(curScrollTop);
  befScrollTop = curScrollTop;

});

// When burger btn click 
navBtn.addEventListener('click', ()=>{
  

    // navigation Links animation 

    Header.style = `opacity: 1;`;

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
     mainNavAnim.classList.toggle('clipJSApply')

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

// mobile screen 
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

// navigation bar get in touch button  
getInTouchHeaderBtn.addEventListener('click', ()=>{

  navBtn.click(); // PerformClick to close the navigation bar 

});


// Timer count down 
const countDown = () => {
  
  let countDate = new Date('June 16, 2021 00:00:00').getTime();
  let Now = new Date().getTime();
  let Gap = countDate - Now;

  let second = 1000;
  let minute = second * 60;
  let hour   = minute * 60;
  let day    = hour * 24;

  let textDay    = Math.floor(Gap/ day);
  let textHour   = Math.floor((Gap % day)   / hour);
  let textMinute = Math.floor((Gap % hour)  / minute);
  let textSecond = Math.floor((Gap % minute)/ second);

  document.querySelector('#Day1').innerText     = textDay;
  document.querySelector('#Hour1').innerText    = textHour;
  document.querySelector('#Minute1').innerText  = textMinute;
  document.querySelector('#Second1').innerText  = textSecond;

 

  if (textMinute % 2 == 0 )
  {
    document.querySelector('.ComingSoonTitle').style = `color:#110322;`;

  } 
  else
  {
    document.querySelector('.ComingSoonTitle').style = ``;
  }
};

// timer count down interval every 1 sec to 
 setInterval(countDown, 1000);
 
