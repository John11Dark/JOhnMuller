const readMore = document.querySelector('.More');

const testimonialsAnim = document.querySelectorAll('.testimonials');
const fadeOnScrollOptions = {
    threshold:1,
    rootMargin: '0px 0px -150px 0px'
};

readMore.addEventListener('click', ()=>{
document.querySelector('.readMoreLessWarper').style = `Display:block;`;
readMore.textContent="readLess"
});



const AnimOnScroll = new IntersectionObserver (function(entries, AnimOnScroll) 
{entries.forEach(entry =>{
    if (!entry.isIntersecting )
    {
        return;
    }
    else
    {
        entry.target.classList.add('fadeInJS');
        appearOnScroll.unobserve(entry.target);
    }
})}, 
fadeOnScrollOptions);

testimonialsAnim.forEach(TestAnim =>{
    AnimOnScroll.observe(TestAnim);
})



