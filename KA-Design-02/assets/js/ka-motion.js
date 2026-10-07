// Reveal [data-ka-reveal] elements as they scroll into view, with a short stagger per group.
document.addEventListener('DOMContentLoaded',()=>{
 const items=[...document.querySelectorAll('[data-ka-reveal]')];
 if(!items.length||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
 document.documentElement.classList.add('ka-motion');
 items.forEach((el,i)=>el.style.setProperty('--ka-delay',`${(el.dataset.kaReveal||i%4)*90}ms`));
 const io=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}}},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 items.forEach(el=>io.observe(el));
});

// Hero H1 sits on one line from 992px up (including zoomed-out and TV views); phones wrap between phrases.
(()=>{
 const run=()=>document.querySelectorAll('.photo-hero-card h1,[data-fit-line]').forEach(h=>{
  h.style.removeProperty('font-size');h.style.removeProperty('white-space');
  if(innerWidth<992)return;
  const max=parseFloat(getComputedStyle(h).fontSize),min=parseFloat(getComputedStyle(document.documentElement).fontSize)*2.5;
  h.style.whiteSpace='nowrap';
  let size=max;
  for(let i=0;i<4&&h.scrollWidth>h.clientWidth&&size>min;i++){size=Math.max(min,Math.floor(size*h.clientWidth/h.scrollWidth*.98));h.style.setProperty('font-size',size+'px','important');}
  h.style.whiteSpace=h.scrollWidth>h.clientWidth?'':'nowrap';
 });
 let t;addEventListener('resize',()=>{clearTimeout(t);t=setTimeout(run,120);});
 document.addEventListener('DOMContentLoaded',run);
 document.fonts?.ready.then(run);
})();

// Section background photos load only when the section comes near the viewport.
document.addEventListener('DOMContentLoaded',()=>{
 const els=document.querySelectorAll('[data-ka-bg]');
 if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('bg-ready'));return;}
 const io=new IntersectionObserver(es=>{for(const e of es)if(e.isIntersecting){e.target.classList.add('bg-ready');io.unobserve(e.target);}},{rootMargin:'600px 0px'});
 els.forEach(e=>io.observe(e));
});
