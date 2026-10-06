// Reveal [data-ka-reveal] elements as they scroll into view, with a short stagger per group.
document.addEventListener('DOMContentLoaded',()=>{
 const items=[...document.querySelectorAll('[data-ka-reveal]')];
 if(!items.length||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
 document.documentElement.classList.add('ka-motion');
 items.forEach((el,i)=>el.style.setProperty('--ka-delay',`${(el.dataset.kaReveal||i%4)*90}ms`));
 const io=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}}},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 items.forEach(el=>io.observe(el));
});
