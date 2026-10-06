// Hide the navbar while scrolling down, bring it back on any scroll up.
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('.navbar-ka');
 if(!nav)return;
 const menu=document.getElementById('kaNavbar');
 const TOLERANCE=8;
 let lastY=scrollY,queued=false;
 const pinned=()=>menu?.classList.contains('show')||menu?.classList.contains('collapsing')||nav.contains(document.activeElement)&&document.activeElement!==document.body;
 const update=()=>{
  queued=false;
  const y=Math.max(scrollY,0),delta=y-lastY;
  if(y<=nav.offsetHeight||pinned()){nav.classList.remove('nav-hidden');lastY=y;return;}
  if(Math.abs(delta)<TOLERANCE)return;
  nav.classList.toggle('nav-hidden',delta>0);
  lastY=y;
 };
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});
 nav.addEventListener('focusin',()=>nav.classList.remove('nav-hidden'));
 menu?.addEventListener('show.bs.collapse',()=>nav.classList.remove('nav-hidden'));
});
