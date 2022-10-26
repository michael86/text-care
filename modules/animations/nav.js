const hamburger = document.getElementById("hamburger");
let navTog = false;

hamburger.addEventListener("click", (e) => {
  navTog = !navTog;

  navTog && openNav();
  !navTog && closeNav();
});

const openNav = () => {
  console.log("open");
};

const closeNav = () => {
  console.log("close");
};
