const body = document.body;
body.classList.add("js");

const header = document.getElementById("siteHeader");
const heroSection = document.getElementById("home");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const allNavLinks = [...document.querySelectorAll(".nav-link, .mobile-nav-link")];

/* -------------------------------------------------
   Core UI setup
------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

let menuTimeline;

function createMenuTimeline() {
  if (!window.gsap || !mobileMenu) return null;

  const links = mobileMenu.querySelectorAll(".mobile-nav-link, .mobile-menu-cta");

  gsap.set(mobileMenu, { autoAlpha: 0 });
  gsap.set(links, { autoAlpha: 0, y: 18 });

  return gsap.timeline({ paused: true })
    .to(mobileMenu, {
      autoAlpha: 1,
      duration: 0.35,
      ease: "power2.out"
    })
    .to(
      links,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: "power3.out"
      },
      "-=0.1"
    );
}

function openMenu() {
  body.classList.add("menu-open");
  mobileMenu.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");

  if (menuTimeline) {
    menuTimeline.play(0);
  }

  setHeaderState();
}

function closeMenu() {
  body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");

  if (menuTimeline) {
    menuTimeline.reverse().eventCallback("onReverseComplete", () => {
      mobileMenu.classList.remove("is-open");
      setHeaderState();
    });
    return;
  }

  mobileMenu.classList.remove("is-open");
  setHeaderState();
}

if (menuToggle && mobileMenu) {
  menuTimeline = createMenuTimeline();

  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.contains("menu-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      closeMenu();
    }
  });
}

/* -------------------------------------------------
   Smooth anchor scrolling with sticky header offset
------------------------------------------------- */
function getHeaderOffset() {
  return header ? header.offsetHeight + 12 : 82;
}

function smoothScrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

allNavLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    smoothScrollToHash(href);

    if (body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
});

/* -------------------------------------------------
   Sticky header state + active navigation on scroll
------------------------------------------------- */
/* HEADER TRANSITION CONTROL: toggles transparent-over-hero vs scrolled header mode. */
function setHeaderState() {
  if (!header) return;

  const scrollY = window.scrollY || document.documentElement.scrollTop;
  header.classList.toggle("is-scrolled", scrollY > 24);

  if (heroSection) {
    const heroThreshold = heroSection.offsetHeight * 0.56;
    const isOnHero = scrollY < heroThreshold && !body.classList.contains("menu-open");
    header.classList.toggle("is-on-hero", isOnHero);
  } else {
    header.classList.remove("is-on-hero");
  }
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", setHeaderState);

function setActiveNav(sectionId) {
  allNavLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("is-active", href === `#${sectionId}`);
  });
}

const navSections = [...document.querySelectorAll("[data-nav-section]")];

if ("IntersectionObserver" in window && navSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActiveNav(entry.target.id);
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-20% 0px -35% 0px"
    }
  );

  navSections.forEach((section) => navObserver.observe(section));
}

/* -------------------------------------------------
   Testimonials slider
------------------------------------------------- */
const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = [...slider.querySelectorAll("[data-slide]")];
  const prev = slider.querySelector("[data-prev]");
  const next = slider.querySelector("[data-next]");
  const dotsWrap = document.querySelector("[data-slider-dots]");

  let current = 0;
  let autoRotateTimer;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `slider-dot ${index === current ? "is-active" : ""}`;
      dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
      dot.addEventListener("click", () => goTo(index));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    renderDots();
    restartAutoRotate();
  }

  function restartAutoRotate() {
    clearInterval(autoRotateTimer);
    autoRotateTimer = setInterval(() => {
      goTo(current + 1);
    }, 6200);
  }

  prev?.addEventListener("click", () => goTo(current - 1));
  next?.addEventListener("click", () => goTo(current + 1));

  slider.addEventListener("mouseenter", () => clearInterval(autoRotateTimer));
  slider.addEventListener("mouseleave", restartAutoRotate);

  goTo(0);
}

/* -------------------------------------------------
   Premium motion system (GSAP + ScrollTrigger)
------------------------------------------------- */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Line-level reveal setup for editorial headline rhythm.
  document.querySelectorAll("[data-stagger-lines] .line").forEach((line) => {
    if (line.querySelector(".line-inner")) return;

    const text = line.textContent.trim();
    line.textContent = "";

    const inner = document.createElement("span");
    inner.className = "line-inner";
    inner.textContent = text;
    line.appendChild(inner);
  });

  document.querySelectorAll("[data-stagger-lines]").forEach((heading) => {
    const lines = heading.querySelectorAll(".line-inner");
    gsap.set(lines, { yPercent: 108, autoAlpha: 0 });

    gsap.to(lines, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 85%"
      }
    });
  });

  gsap.utils.toArray(".reveal-up").forEach((item) => {
    gsap.from(item, {
      y: 30,
      autoAlpha: 0,
      duration: 0.88,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 88%"
      }
    });
  });

  gsap.utils.toArray(".reveal-scale").forEach((item) => {
    gsap.from(item, {
      scale: 0.95,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 88%"
      }
    });
  });

  gsap.utils.toArray("[data-stagger-cards]").forEach((group) => {
    const cards = [...group.children];
    gsap.from(cards, {
      y: 24,
      autoAlpha: 0,
      duration: 0.82,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: group,
        start: "top 84%"
      }
    });
  });

  gsap.utils.toArray("[data-stagger-buttons]").forEach((group) => {
    const buttons = group.querySelectorAll(".btn");
    gsap.from(buttons, {
      y: 14,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: {
        trigger: group,
        start: "top 90%"
      }
    });
  });

  gsap.utils.toArray("[data-parallax]").forEach((item) => {
    const amount = Number(item.dataset.parallax) || 8;
    gsap.to(item, {
      yPercent: amount,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });

  /* HERO SCROLL ANIMATION CONTROL */
  const heroBgImage = document.querySelector(".hero-bg img");
  const heroCanvas = document.querySelector("[data-hero-content]");
  const heroOverlay = document.querySelector(".hero-overlay");
  if (heroSection && heroBgImage && heroCanvas && heroOverlay) {
    const heroFadeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 1.05
      }
    });

    heroFadeTimeline
      .to(heroBgImage, { scale: 1.08, autoAlpha: 0.48, ease: "none" }, 0)
      .to(heroOverlay, { opacity: 0.14, ease: "none" }, 0)
      .to(heroCanvas, { yPercent: -14, autoAlpha: 0.34, ease: "none" }, 0);
  }

  /* HERO LINE ANIMATION CONTROL: subtle layered curve draw + scroll-linked motion. */
  const heroCurvePaths = gsap.utils.toArray(".hero-curve");
  if (heroSection && heroCurvePaths.length) {
    heroCurvePaths.forEach((path, index) => {
      const pathLength = path.getTotalLength();
      const startOffset = pathLength * 0.92;
      const introOffset = pathLength * 0.56;

      path.dataset.introOffset = String(introOffset);

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: startOffset,
        autoAlpha: index === 0 ? 0.84 : 0.56
      });
    });

    gsap.to(heroCurvePaths, {
      strokeDashoffset: (index, target) => Number(target.dataset.introOffset),
      duration: 1.35,
      stagger: 0.1,
      ease: "power2.out"
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    })
      .to(heroCurvePaths, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.05
      }, 0)
      .to(heroCurvePaths, {
        yPercent: -6,
        autoAlpha: (index) => (index === 0 ? 0.58 : 0.34),
        ease: "none",
        stagger: 0.04
      }, 0);
  }

  const topStory = document.getElementById("topStory");
  const guideLineSvg = document.getElementById("guideLineSvg");
  const guideLineMain = document.getElementById("guideLineMain");
  const guideLineGhostA = document.getElementById("guideLineGhostA");
  const guideLineGhostB = document.getElementById("guideLineGhostB");

  let guideDrawTween;

  function getAnchorPoint(anchorName, fallbackRatio, containerRect) {
    const anchor = document.querySelector(`[data-line-anchor="${anchorName}"]`);

    if (!anchor) {
      return {
        x: containerRect.width * fallbackRatio.x,
        y: containerRect.height * fallbackRatio.y
      };
    }

    const rect = anchor.getBoundingClientRect();

    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2
    };
  }

  /* SVG PATH DEFINED HERE: primary and ghost guide curves from hero into first sections. */
  function buildGuidePaths() {
    if (!topStory || !guideLineSvg || !guideLineMain || !guideLineGhostA || !guideLineGhostB) return;

    const width = topStory.clientWidth;
    const height = topStory.scrollHeight;
    const storyRect = topStory.getBoundingClientRect();

    guideLineSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const heroPoint = getAnchorPoint("hero", { x: 0.66, y: 0.2 }, storyRect);
    const aboutPoint = getAnchorPoint("about", { x: 0.35, y: 0.5 }, storyRect);
    const collectionPoint = getAnchorPoint("collection", { x: 0.66, y: 0.77 }, storyRect);

    const startX = heroPoint.x + width * 0.05;
    const startY = Math.max(24, heroPoint.y - height * 0.22);

    const dMain = [
      `M ${startX.toFixed(2)} ${startY.toFixed(2)}`,
      `C ${(startX - width * 0.12).toFixed(2)} ${(startY + height * 0.1).toFixed(2)}, ${(heroPoint.x + width * 0.08).toFixed(2)} ${(heroPoint.y - height * 0.06).toFixed(2)}, ${heroPoint.x.toFixed(2)} ${heroPoint.y.toFixed(2)}`,
      `C ${(heroPoint.x - width * 0.24).toFixed(2)} ${(heroPoint.y + height * 0.13).toFixed(2)}, ${(aboutPoint.x + width * 0.2).toFixed(2)} ${(aboutPoint.y - height * 0.09).toFixed(2)}, ${aboutPoint.x.toFixed(2)} ${aboutPoint.y.toFixed(2)}`,
      `C ${(aboutPoint.x - width * 0.2).toFixed(2)} ${(aboutPoint.y + height * 0.16).toFixed(2)}, ${(collectionPoint.x + width * 0.2).toFixed(2)} ${(collectionPoint.y - height * 0.08).toFixed(2)}, ${collectionPoint.x.toFixed(2)} ${(collectionPoint.y + height * 0.12).toFixed(2)}`
    ].join(" ");

    const dGhostA = [
      `M ${(startX - width * 0.04).toFixed(2)} ${(startY - 30).toFixed(2)}`,
      `C ${(startX - width * 0.18).toFixed(2)} ${(startY + height * 0.08).toFixed(2)}, ${(heroPoint.x + width * 0.03).toFixed(2)} ${(heroPoint.y - height * 0.11).toFixed(2)}, ${(heroPoint.x - width * 0.02).toFixed(2)} ${(heroPoint.y - 8).toFixed(2)}`,
      `C ${(heroPoint.x - width * 0.31).toFixed(2)} ${(heroPoint.y + height * 0.11).toFixed(2)}, ${(aboutPoint.x + width * 0.12).toFixed(2)} ${(aboutPoint.y - height * 0.14).toFixed(2)}, ${(aboutPoint.x - width * 0.03).toFixed(2)} ${(aboutPoint.y - 20).toFixed(2)}`,
      `C ${(aboutPoint.x - width * 0.24).toFixed(2)} ${(aboutPoint.y + height * 0.14).toFixed(2)}, ${(collectionPoint.x + width * 0.16).toFixed(2)} ${(collectionPoint.y - height * 0.16).toFixed(2)}, ${(collectionPoint.x - width * 0.04).toFixed(2)} ${(collectionPoint.y + height * 0.08).toFixed(2)}`
    ].join(" ");

    const dGhostB = [
      `M ${(startX + width * 0.02).toFixed(2)} ${(startY + 22).toFixed(2)}`,
      `C ${(startX - width * 0.08).toFixed(2)} ${(startY + height * 0.14).toFixed(2)}, ${(heroPoint.x + width * 0.12).toFixed(2)} ${(heroPoint.y - height * 0.02).toFixed(2)}, ${(heroPoint.x + width * 0.03).toFixed(2)} ${(heroPoint.y + 14).toFixed(2)}`,
      `C ${(heroPoint.x - width * 0.2).toFixed(2)} ${(heroPoint.y + height * 0.18).toFixed(2)}, ${(aboutPoint.x + width * 0.26).toFixed(2)} ${(aboutPoint.y - height * 0.03).toFixed(2)}, ${(aboutPoint.x + width * 0.04).toFixed(2)} ${(aboutPoint.y + 16).toFixed(2)}`,
      `C ${(aboutPoint.x - width * 0.15).toFixed(2)} ${(aboutPoint.y + height * 0.19).toFixed(2)}, ${(collectionPoint.x + width * 0.23).toFixed(2)} ${(collectionPoint.y - height * 0.04).toFixed(2)}, ${(collectionPoint.x + width * 0.03).toFixed(2)} ${(collectionPoint.y + height * 0.15).toFixed(2)}`
    ].join(" ");

    guideLineMain.setAttribute("d", dMain);
    guideLineGhostA.setAttribute("d", dGhostA);
    guideLineGhostB.setAttribute("d", dGhostB);

    [guideLineMain, guideLineGhostA, guideLineGhostB].forEach((path) => {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength}`;
    });

    if (guideDrawTween) {
      guideDrawTween.scrollTrigger?.kill();
      guideDrawTween.kill();
    }

    /* LINE ANIMATION CONTROL: line drawing tied to top-story scroll progress. */
    guideDrawTween = gsap.timeline({
      scrollTrigger: {
        trigger: topStory,
        start: "top top",
        end: () => `+=${Math.max(760, topStory.offsetHeight * 0.9)}`,
        scrub: 1.1
      }
    });

    guideDrawTween
      .to(guideLineMain, { strokeDashoffset: 0, ease: "none" }, 0)
      .to([guideLineGhostA, guideLineGhostB], { strokeDashoffset: 0, ease: "none", stagger: 0.08 }, 0.06);
  }

  buildGuidePaths();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setHeaderState();
      buildGuidePaths();
      ScrollTrigger.refresh();
    }, 180);
  });

  window.addEventListener("load", () => {
    setHeaderState();
    buildGuidePaths();
    ScrollTrigger.refresh();
  });
}
