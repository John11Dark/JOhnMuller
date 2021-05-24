

// Declaer a variables 
const Curser = document.querySelector(".curser");
const header = document.querySelector("header");
// navigation bar
const burger = document.querySelector('.Menu_Links');
const navigationBar = document.querySelector('.mainNav');
const navLinks =document.querySelectorAll('.navLinksList li')


const StickyBC = document.querySelector("#head_img");
const DEText = document.querySelector(".title_Name");
const Div_text = document.querySelector(".text_Title_top");
const FadeOnScroll = document.querySelectorAll(".main-holder");
const navColor = document.querySelectorAll(".navColorTop");


//
// Mouse Curser 
//  
// add event listener on mouse move Y axis and X axis
document.addEventListener('mousemove', e =>{
  // apply CSS style on the courser 
Curser.setAttribute("style", "top: "+e.pageY+"px; left: "+e.pageX+"px;")  
 
// add event listener on Click Then apply *crsAni* class on the curser
document.addEventListener('click', () => {
  Curser.classList.add("clickAnimation");

  // Set time out for the click animation 
  // so it will be removed after each click and applied again  
  setTimeout(() =>{
    Curser.classList.remove("clickAnimation");
  }, 200)
})
})

//  Header and Top part margin options   
const options = {
  rootMargin:"-120px 0px 0px 0px"

};

// Menu burger 

burger.addEventListener('click', ()=>{
  // burger button nav
navigationBar.classList.toggle('clipJSApply')
navLinks.classList.toggle('navFadeInJSApply')

// links animation 

navLinks.forEach((link, index) =>{
  if(link.style.animation){
    link.style.animation =''
  }

  else{
    link.style.animation = `navLinksFadeAnim 0.5s ease forwards ${index / 3 + 1.5}s`
  }

    });
// close button animation 
    burger.classList.toggle('menu_burgure');
});



// Entry header || Top part 
const observer = new IntersectionObserver (function(entries, observer)
{
entries.forEach(entry => {
      if (!entry.isIntersecting){
          header.classList.add("HeaderbackColor");
          DEText.classList.add("HeaderbackColor");
          Div_text.classList.add("HeaderbackColor");

      }else{
          header.classList.remove("HeaderbackColor");    
          DEText.classList.remove("HeaderbackColor");
          Div_text.classList.remove("HeaderbackColor");

      }
  });

}, options); observer.observe(StickyBC);



const appearOptions = {
  threshold:1,
  rootMargin: "100px 0px -100px 0px"
}

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



