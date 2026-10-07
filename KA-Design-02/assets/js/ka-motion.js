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

// Phone-only home hero slider: Melbourne + Teacher Corner, then Sydney + Student Corner, every 2 seconds.
// Touching, swiping or using the dots pauses it for a few seconds; it stops auto-advancing under reduced motion.
document.addEventListener('DOMContentLoaded',()=>{
 const hero=document.querySelector('.home-page .hero');
 if(!hero)return;
 const panels=[...hero.querySelectorAll('.corner-panel')],links=[...hero.querySelectorAll('.city-openings a')];
 if(panels.length<2)return;
 const mq=matchMedia('(max-width: 767px)'),still=matchMedia('(prefers-reduced-motion: reduce)');
 const dots=document.createElement('div');
 dots.className='hero-dots';
 dots.innerHTML='<button type="button" aria-label="Show Melbourne and Teacher Corner"></button><button type="button" aria-label="Show Sydney and Student Corner"></button>';
 hero.append(dots);
 let i=0,timer=null,pausedUntil=0,x0=null;
 const show=n=>{
  i=n;hero.dataset.slide=n;
  [...dots.children].forEach((b,k)=>b.setAttribute('aria-current',String(k===n)));
  panels.forEach((p,k)=>p.toggleAttribute('inert',k!==n));
  links.forEach((l,k)=>l.toggleAttribute('inert',k!==n));
 };
 const pause=ms=>{pausedUntil=Date.now()+ms;};
 const start=()=>{
  clearInterval(timer);
  if(!mq.matches){delete hero.dataset.slide;panels.forEach(p=>p.removeAttribute('inert'));links.forEach(l=>l.removeAttribute('inert'));return;}
  show(i);
  requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('slider-anim')));
  if(!still.matches)timer=setInterval(()=>{if(Date.now()>=pausedUntil&&!document.hidden)show((i+1)%2);},2000);
 };
 dots.addEventListener('click',e=>{const b=e.target.closest('button');if(b){show([...dots.children].indexOf(b));pause(6000);}});
 hero.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;pause(6000);},{passive:true});
 hero.addEventListener('touchend',e=>{if(x0!==null&&Math.abs(e.changedTouches[0].clientX-x0)>40&&mq.matches)show((i+1)%2);x0=null;},{passive:true});
 hero.addEventListener('focusin',()=>pause(8000));
 mq.addEventListener('change',start);still.addEventListener('change',start);
 start();
});
