(()=>{const btn=document.getElementById('menuToggle');const menu=document.getElementById('overlayMenu');const header=document.getElementById('header');const lock=v=>{document.body.style.overflow=v?'hidden':''};function setMenu(open){if(!btn||!menu)return;menu.classList.toggle('open',open);menu.inert=!open;btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');lock(open)}if(btn&&menu){btn.addEventListener('click',()=>setMenu(btn.getAttribute('aria-expanded')!=='true'));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));window.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)})}if(header){const update=()=>header.classList.toggle('is-scrolled',window.scrollY>70);update();window.addEventListener('scroll',update,{passive:true})}const slider=document.getElementById('storyStrip');document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{if(!slider)return;const slide=slider.querySelector('.story');const width=(slide?.getBoundingClientRect().width||400)+22;slider.scrollBy({left:width*(b.dataset.slide==='next'?1:-1),behavior:'smooth'})}))})();
;(()=>{
  'use strict';
  const audio=document.getElementById('kalinkaAudio');
  const toggle=document.getElementById('kalinkaToggle');
  const mute=document.getElementById('kalinkaMute');
  const volume=document.getElementById('kalinkaVolume');
  const prompt=document.getElementById('kalinkaPrompt');
  const start=document.getElementById('kalinkaStart');
  const dismiss=document.getElementById('kalinkaDismiss');
  if(!audio||!toggle)return;
  audio.volume=.38;
  const sync=()=>{
    const on=!audio.paused;
    toggle.textContent=on?'❚❚  DURDUR':'▶  KALINKA’YI BAŞLAT';
    toggle.setAttribute('aria-label',on?'Kalinka müziğini durdur':'Kalinka müziğini başlat');
    mute.textContent=audio.muted?'🔇':'♫';
    mute.setAttribute('aria-label',audio.muted?'Sesi aç':'Sesi kapat');
    volume.value=String(Math.round(audio.volume*100));
  };
  const play=async()=>{
    try{
      audio.muted=false;
      await audio.play();
      prompt.hidden=true;
    }catch(e){
      prompt.hidden=false;
      if(e?.name!=='NotAllowedError'){
        const p=prompt.querySelector('p');
        if(p)p.textContent='Ses dosyası yüklenemedi. Tekrar deneyebilir veya sessiz gezinebilirsin.';
      }
    }
    sync();
  };
  toggle.addEventListener('click',()=>{if(audio.paused){play()}else{audio.pause();prompt.hidden=true;sync()}});
  start.addEventListener('click',play);
  dismiss.addEventListener('click',()=>{prompt.hidden=true;audio.pause();sync()});
  mute.addEventListener('click',()=>{audio.muted=!audio.muted;sync()});
  volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100;if(audio.volume>0)audio.muted=false;sync()});
  audio.addEventListener('play',sync);
  audio.addEventListener('pause',sync);
  audio.addEventListener('error',()=>{prompt.hidden=false;sync()});
  sync();
  // Browser autoplay policies can reject unmuted sound until a click/tap.
  // Attempt once on every new page, then provide a clear user-triggered fallback.
  play();
})();
