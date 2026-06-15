/* Muhib Ullah — portfolio
   Pure JS. No deps. Interactive + animated. */
(function(){
  'use strict';

  // ---- Nav scroll state ----
  const nav = document.querySelector('.nav');
  const progress = document.querySelector('.progress');
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 12);
    if (progress){
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y/h)*100 : 0) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ---- Reveal on scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('in'));
  }

  // ---- Counters ----
  const counters = document.querySelectorAll('[data-count]');
  const seen = new WeakSet();
  if ('IntersectionObserver' in window && counters.length){
    const cio = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(!e.isIntersecting || seen.has(e.target)) return;
        seen.add(e.target);
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        const tick = (t)=>{
          const p = Math.min((t-start)/dur, 1);
          const eased = 1 - Math.pow(1-p, 3);
          el.textContent = Math.round(target*eased) + suffix;
          if (p<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, {threshold:0.4});
    counters.forEach(el=>cio.observe(el));
  }

  // ---- Cursor blob (desktop) ----
  const mq = window.matchMedia('(hover:hover) and (pointer:fine)');
  if (mq.matches){
    const blob = document.createElement('div');
    blob.className = 'blob';
    document.body.appendChild(blob);
    let tx=0, ty=0, x=0, y=0;
    window.addEventListener('mousemove', (e)=>{ tx=e.clientX; ty=e.clientY; });
    const loop = ()=>{
      x += (tx-x)*0.12; y += (ty-y)*0.12;
      blob.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    document.querySelectorAll('a,button,.skill-card,.go-step,.tl-item,.quote').forEach(el=>{
      el.addEventListener('mouseenter', ()=>blob.classList.add('active'));
      el.addEventListener('mouseleave', ()=>blob.classList.remove('active'));
    });
  }

  // ---- Magnetic buttons ----
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('mousemove', (e)=>{
      const r = btn.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width/2;
      const my = e.clientY - r.top - r.height/2;
      btn.style.setProperty('--bx', (mx*0.25)+'px');
      btn.style.setProperty('--by', (my*0.35)+'px');
    });
    btn.addEventListener('mouseleave', ()=>{
      btn.style.setProperty('--bx','0px');
      btn.style.setProperty('--by','0px');
    });
  });

  // ---- Card spotlight ----
  document.querySelectorAll('.skill-card').forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX-r.left)+'px');
      card.style.setProperty('--my', (e.clientY-r.top)+'px');
    });
  });

  // ---- Typewriter for hero role ----
  const tw = document.querySelector('[data-typewriter]');
  if (tw){
    const words = JSON.parse(tw.dataset.typewriter);
    let wi = 0, ci = 0, deleting = false;
    const span = tw.querySelector('.tw');
    const step = ()=>{
      const w = words[wi];
      if (!deleting){
        span.textContent = w.slice(0, ++ci);
        if (ci === w.length){ deleting = true; setTimeout(step, 1600); return; }
      } else {
        span.textContent = w.slice(0, --ci);
        if (ci === 0){ deleting = false; wi = (wi+1) % words.length; }
      }
      setTimeout(step, deleting ? 40 : 80);
    };
    setTimeout(step, 900);
  }

  // ---- Parallax hero orbs ----
  const orbs = document.querySelectorAll('.hero-orb');
  if (orbs.length){
    window.addEventListener('mousemove', (e)=>{
      const cx = (e.clientX/window.innerWidth - 0.5);
      const cy = (e.clientY/window.innerHeight - 0.5);
      orbs.forEach((o,i)=>{
        const f = i===0 ? 30 : -40;
        o.style.transform = `translate(${cx*f}px, ${cy*f}px)`;
      });
    });
  }

  // ---- Contact form ----
  const form = document.getElementById('contact-form');
  if (form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const name = form.querySelector('#cf-name').value.trim();
      status.textContent = (name ? name + ', t' : 'T') + 'hanks — message queued. I will reply soon.';
      form.reset();
      setTimeout(()=>{ status.textContent=''; }, 6000);
    });
  }

  // ---- Smooth anchor ----
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if (id.length>1){
        const t = document.querySelector(id);
        if (t){
          e.preventDefault();
          t.scrollIntoView({behavior:'smooth', block:'start'});
          history.pushState(null,'',id);
        }
      }
    });
  });

  // ---- Year ----
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
