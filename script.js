// Simple JS: cursor tracking, typing effect, visible-on-scroll, mobile nav, form
// python -m http.server 8000 
(function(){
  // Custom cursor tracking
  const cursor = document.querySelector('.cursor');
  let hoverTimeout;
  window.addEventListener('mousemove', (e)=>{
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  // Enlarge cursor when hovering interactive elements
  const setHover = (state)=>{
    clearTimeout(hoverTimeout);
    if(state){
      cursor.classList.add('hover');
    } else {
      hoverTimeout = setTimeout(()=>cursor.classList.remove('hover'), 50);
    }
  };
  document.querySelectorAll('[data-hoverable]').forEach(el=>{
    el.addEventListener('mouseenter', ()=>setHover(true));
    el.addEventListener('mouseleave', ()=>setHover(false));
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(toggle){
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Typewriter effect
  const messages = [
    'Build. Innovate. Impact.',
    '24 Hours • Non-stop Creativity',
    'Hardware and Software Tracks',
    'Mentors • Prizes • Swag'
  ];
  const el = document.getElementById('typewriter');
  const caret = document.querySelector('.caret');
  let i=0, j=0, deleting=false;
  const speed = { type: 70, erase: 40, wait: 1400 };
  function tick(){
    const current = messages[i % messages.length];
    if(!deleting){
      el.textContent = current.slice(0, j++);
      if(j>current.length){
        deleting = true;
        setTimeout(tick, speed.wait);
        return;
      }
    } else {
      el.textContent = current.slice(0, --j);
      if(j===0){
        deleting=false; i++; 
      }
    }
    setTimeout(tick, deleting ? speed.erase : speed.type);
  }
  tick();

  // Reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries)=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold:.12 });
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // Smooth in-page navigation
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', (e)=>{
      const id = link.getAttribute('href');
      if(id && id.length>1){
        const dest = document.querySelector(id);
        if(dest){
          e.preventDefault();
          dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    })
  });

  // Simple contact form handler (client-side demo)
  const form = document.getElementById('contact-form');
  const status = document.querySelector('.form-status');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      if(!name || !email){
        status.textContent = 'Please fill in required fields.';
        return;
      }
      status.textContent = 'Thanks! We\'ll get back to you soon.';
      form.reset();
    });
  }

  // Optional: Back to top quick show on scroll depth
  const backTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>500){ backTop?.classList.add('visible'); } else { backTop?.classList.remove('visible'); }
  });
})();