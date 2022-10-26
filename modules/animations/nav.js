const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");
const navItems = nav.querySelectorAll("li");
const primaryColor = "#161635";

const tl = gsap.timeline({ delay: 0, paused: true });

tl.to(nav, {
  opacity: 1,
  width: "100%",
  height: "fit-content",

  backgroundColor: primaryColor,
  rotation: 360,
  top:
    document.getElementById("nav-container").getBoundingClientRect().height - 1,
  duration: 0.5,
}).to(navItems, {
  color: "#fff",
  duration: 0.1,
  marginBottom: "10px",
  scale: 1.3,
  stagger: 0.2,
});

let navTog = false;

hamburger.addEventListener("click", (e) => {
  navTog = !navTog;

  navTog && tl.play();
  !navTog && tl.reverse();
});
