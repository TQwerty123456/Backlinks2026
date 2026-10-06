document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.navbar-ka');
  const progress=document.createElement('div');progress.className='motion-progress';document.body.append(progress);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scheduled=false;
  function update(){const y=scrollY;nav?.classList.toggle('scrolled',y>24);const total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?Math.min(y/total,1):0})`;scheduled=false}
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update,{passive:true});update();
  if(!reduced)document.querySelectorAll('.corner-panel').forEach(panel=>panel.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;const r=panel.getBoundingClientRect();panel.style.setProperty('--px',`${(event.clientX-r.left)/r.width*100}%`);panel.style.setProperty('--py',`${(event.clientY-r.top)/r.height*100}%`)}));
  const targets=document.querySelectorAll('.section h2,.section .value-card,.section .team-card,.section .audience-tile,.process-step,.form-ka,.policy-body > h2');
  targets.forEach((el,i)=>{if(!el.classList.contains('reveal')&&!el.closest('.reveal')){el.classList.add('reveal');el.style.transitionDelay=`${i%3*70}ms`}});
  if(!reduced&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});targets.forEach(el=>observer.observe(el))}else targets.forEach(el=>el.classList.add('is-visible'));
});
