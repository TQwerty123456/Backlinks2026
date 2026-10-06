document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('.navbar-ka');
 const hero=document.querySelector('header');
 const updateNav=()=>nav?.classList.toggle('past-hero',!!hero&&hero.getBoundingClientRect().bottom<125);
 updateNav();addEventListener('scroll',updateNav,{passive:true});addEventListener('resize',updateNav,{passive:true});
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
 const nodes=document.querySelectorAll('main .section h2,main .section .section-eyebrow,.editorial-photo,.editorial-values article,.pathway,.founder-pair figure,.home-steps article,.value-card,.team-card,.process-step');
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}},{threshold:.05,rootMargin:'0px 0px 30px 0px'});
 document.documentElement.classList.add('motion-ready');
 nodes.forEach((node,i)=>{node.classList.add('motion-item');node.style.setProperty('--reveal-delay',`${i%3*65}ms`);observer.observe(node);});
 let queued=false;
 const revealPassed=()=>{queued=false;for(const node of nodes){if(!node.classList.contains('in-view')&&node.getBoundingClientRect().top<innerHeight-25){node.classList.add('in-view');observer.unobserve(node);}}};
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(revealPassed);}},{passive:true});
 revealPassed();
});
