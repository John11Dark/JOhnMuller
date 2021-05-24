const  MenuFormO = () =>{
    const btnNav = document.querySelector('.lines_menu')
    const nav = document.querySelector('.bottom-100vh')
    
    const navLinks = document.querySelectorAll('.links li');

        btnNav.addEventListener('click', ()=>{


            //when toggle the nav button 

            nav.classList.toggle('MenuShow');

           
            //animation on links 
            navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''; 

            } else {
                link.style.animation = `LinksFadeIn 0.5s ease forwards ${index / 7 + 1.45}s`;
            }

            
        });    
        
          //after toggle the nav button 
          btnNav.classList.toggle('AfterClick');
});
  







}


            // When i click on the CV button 
            
            const PnlCV =() =>{  
                const CvButton = document.querySelector('.Cv-btn')
                const btnCloseCv= document.querySelector('.btn-close-Cv') 
                const CVFormP= document.querySelector('.CV-Form')
             
                CvButton.addEventListener('click', ()=>{
                    CVFormP.classList.toggle('About-Me-AfterClickCV');
                });
                
                btnCloseCv.addEventListener('click', ()=>{
                    CVFormP.classList.toggle('Btn-Close-AfterClickCV')
                }); 
            } 

            //When About me button toggle 
            const AboutFormS =() =>{  
                const AboutButton = document.querySelector('.About-me-btn')
                const btnClose= document.querySelector('.btn-close') 
                const AboutForm= document.querySelector('.about-me-form')
                AboutButton.addEventListener('click', ()=>{

                    AboutForm.classList.toggle('About-Me-AfterClick');
                });

                btnClose.addEventListener('click', ()=>{

                    AboutForm.classList.toggle('Btn-Close-AfterClick')
                }); 
            }

            



    MenuFormO();
    PnlCV();
    AboutFormS();
