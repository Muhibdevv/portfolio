/* Muhib Ullah — portfolio interactions */
(() => {
  "use strict";

  // Easter egg
  const css =
    "color:#34e3ff;font:600 13px Inter,sans-serif;text-shadow:0 0 12px #34e3ff";
  console.log("%cBuilt by Muhib — performance is everything.", css);

  // Year
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Floating-label placeholders ---------- */
  document.querySelectorAll(".field input, .field textarea").forEach((el) => {
    el.setAttribute("placeholder", " ");
  });

  /* ---------- Theme toggle ---------- */
  const themeBtn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("muhib-theme");
  if (stored) document.body.dataset.theme = stored;
  themeBtn?.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    localStorage.setItem("muhib-theme", next);
  });

  /* ---------- Scroll progress ---------- */
  const sp = document.querySelector(".scroll-progress span");
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
    if (sp) sp.style.width = (p * 100).toFixed(2) + "%";
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Custom cursor ---------- */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let mx = innerWidth / 2,
    my = innerHeight / 2,
    rx = mx,
    ry = my;
  addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) {
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      }
    },
    { passive: true },
  );
  const tick = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    if (ring)
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const hoverables =
    "a, button, [data-magnetic], .skill, .project, input, textarea";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) ring?.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) ring?.classList.remove("is-hover");
  });

  /* ---------- Magnetic buttons/links ---------- */
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = 18;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(x / r.width) * strength}px,${(y / r.height) * strength}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  /* ---------- Skills ---------- */
  const skills = [
    { name: "HTML5", level: 98, tag: "Core" },
    { name: "CSS3 / SCSS", level: 96, tag: "Core" },
    { name: "JavaScript", level: 94, tag: "Advanced" },
    { name: "TypeScript", level: 78, tag: "Selective" },
    { name: "GSAP", level: 90, tag: "Animation" },
    { name: "Bootstrap", level: 88, tag: "Framework" },
    { name: "Tailwind", level: 70, tag: "Familiar" },
    { name: "jQuery", level: 80, tag: "Legacy" },
    {
      name: "Go (Golang)",
      level: 35,
      tag: "Backend Expansion",
      highlight: true,
    },
  ];
  const grid = document.getElementById("skillsGrid");
  if (grid) {
    grid.innerHTML = skills
      .map(
        (s) => `
      <article class="skill ${s.highlight ? "is-highlight" : ""}" data-level="${s.level}">
        <div class="skill-top">
          <span class="skill-name">${s.name}</span>
          <span class="skill-tag">${s.tag}</span>
        </div>
        <div class="skill-bar"><span></span></div>
      </article>
    `,
      )
      .join("");
  }

  /* ---------- Projects ---------- */
  const projects = [
    {
      title: "UK Financial Dashboard UI",
      desc: "Real-time portfolio and risk-exposure interface for a UK financial enterprise. Optimized chart rendering, virtualized tables, and tight performance budgets.",
      stack: ["TypeScript", "SCSS", "GSAP", "Web Workers"],
      metrics: [
        ["62%", "Faster LCP"],
        ["0", "CLS"],
      ],
    },
    {
      title: "Enterprise SaaS Admin Panel",
      desc: "Component-driven admin system for a large SaaS platform. Modular SCSS architecture, role-aware UI, and reusable interaction patterns at scale.",
      stack: ["JavaScript", "SCSS", "Design Tokens"],
      metrics: [
        ["120+", "Components"],
        ["↑ 38%", "Productivity"],
      ],
    },
    {
      title: "High-Traffic Landing System",
      desc: "Templated landing engine handling spike traffic for enterprise launches. Aggressive image optimization, deferred hydration, and edge-friendly rendering.",
      stack: ["HTML5", "CSS3", "GSAP"],
      metrics: [
        ["98", "Lighthouse"],
        ["<1.2s", "TTI"],
      ],
    },
    {
      title: "Real-time Analytics Frontend",
      desc: "Streaming analytics UI with high-frequency updates. Engineered render scheduling and DOM diffing to maintain a steady 60fps under load.",
      stack: ["TypeScript", "Canvas", "GSAP"],
      metrics: [
        ["60fps", "Sustained"],
        ["10k+", "Events/s"],
      ],
    },
  ];
  const pg = document.getElementById("projectsGrid");
  if (pg) {
    pg.innerHTML = projects
      .map(
        (p, i) => `
      <article class="project" data-tilt>
        <div class="proj-head">
          <h3 class="proj-title">${p.title}</h3>
          <span class="proj-index">0${i + 1}</span>
        </div>
        <p class="proj-desc">${p.desc}</p>
        <div class="proj-stack">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
        <div class="proj-metrics">
          ${p.metrics.map((m) => `<div><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join("")}
        </div>
      </article>
    `,
      )
      .join("");
  }

  /* ---------- Project tilt + spotlight ---------- */
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left,
        y = e.clientY - r.top;
      const rx = (y / r.height - 0.5) * -6;
      const ry = (x / r.width - 0.5) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector(".btn-submit");
    btn?.classList.add("is-rippling");
    const subj = encodeURIComponent(
      "Portfolio contact — " + (form["cf-name"]?.value || ""),
    );
    const body = encodeURIComponent(
      (form["cf-msg"]?.value || "") +
        "\n\nFrom: " +
        (form["cf-email"]?.value || ""),
    );
    setTimeout(() => {
      window.location.href = `mailto:muhib.devv@gmail.com?subject=${subj}&body=${body}`;
      btn?.classList.remove("is-rippling");
    }, 500);
  });

  /* ---------- Typing animation ---------- */
  const phrases = [
    "high-performance web experiences",
    "scalable enterprise UI systems",
    "pixel-disciplined interfaces",
    "production-grade frontends",
  ];
  const tEl = document.getElementById("typeTarget");
  if (tEl) {
    let i = 0,
      j = 0,
      del = false;
    const loop = () => {
      const word = phrases[i];
      tEl.textContent = word.slice(0, j);
      if (!del && j < word.length) {
        j++;
        setTimeout(loop, 55);
      } else if (del && j > 0) {
        j--;
        setTimeout(loop, 25);
      } else {
        del = !del;
        if (!del) i = (i + 1) % phrases.length;
        setTimeout(loop, del ? 1600 : 400);
      }
    };
    loop();
  }

  /* ---------- GSAP reveals (once GSAP is loaded) ---------- */
  const start = () => {
    if (!window.gsap) return;
    const { gsap } = window;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // Hero reveal
    gsap.to(".hero .reveal, .hero .reveal-stagger > *", {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.1,
    });

    // Section reveals
    gsap.utils.toArray(".section").forEach((sec) => {
      const items = sec.querySelectorAll(".reveal, .reveal-stagger > *");
      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sec, start: "top 78%" },
      });
    });

    // Skill bars
    gsap.utils.toArray(".skill").forEach((s) => {
      const bar = s.querySelector(".skill-bar span");
      const level = s.getAttribute("data-level") || 80;
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: level + "%",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: s, start: "top 88%" },
        },
      );
    });

    // Background orbs parallax
    gsap.to(".orb-1", {
      x: 80,
      y: 60,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".orb-2", {
      x: -100,
      y: -40,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".orb-3", {
      x: 60,
      y: -50,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  };

  if (window.gsap) start();
  else window.addEventListener("load", start);
})();
