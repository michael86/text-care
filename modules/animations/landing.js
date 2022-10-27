gsap.set(".landing-text", { perspective: 400 });

const tl = gsap
  .timeline({ paused: true })
  .from(
    ".landing-img",
    {
      duration: 0.5,
      opacity: 0,

      y: "100",
    },
    "+=0.5"
  )
  .from(".landing-text", {
    duration: 0.5,
    opacity: 0,
    y: "100",
    stagger: 0.5,
  })
  .to(".app-container", {
    duration: 0.5,
    backgroundColor: "rgba(53, 38, 22, 0.9)",
    border: "2px solid",
  })
  .from(".landing-cta", {
    duration: 0.5,
    opacity: 0,
    y: "0",
    stagger: 0.5,
  })
  .to(".app-image", {
    duration: 0.2,
    opacity: 1,
    stagger: 0.5,
    x: 0,
  });

tl.play();

[...document.querySelectorAll(".app-image")].forEach((img) => {
  img.addEventListener("mouseenter", (e) => {
    gsap.to(img, {
      scale: 1.3,
    });
  });

  img.addEventListener("mouseleave", (e) => {
    gsap.to(img, {
      scale: 1,
    });
  });
});

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const splash = document.querySelector(".header-splash");

const splashTl = gsap.timeline({ paused: true });

splashTl

  .to(".splash-landscape-view", {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power3",
  })
  .to(".splash-potrait-view", {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power3",
  })
  .to(".splash-convo", {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power3",
  })
  .to(".splash-message", {
    duration: 1,
    x: 0,
    stagger: 0.5,
  });

const animateSplash = (entries) => {
  entries.forEach((entry) => {
    console.log(entry.intersectionRatio);
    if (entry.intersectionRatio > 0.5) {
      splashTl.play();
    }
  });
};

let observer = new IntersectionObserver(animateSplash, options);
observer.observe(splash);
