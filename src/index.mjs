import "./main.scss";
import user from "../assets/img/users.jpg";

const about = document.getElementById("about");
const app = document.querySelector(".app");
const dropShadow = document.querySelector(".dropShadow");
const experience = document.getElementById("experience");
const footer = document.getElementById("footer");
const nav = document.querySelector(".header-nav");
const navItem = document.querySelectorAll(".navItem");
// const project = document.getElementById('project');
const welcomeImage = document.querySelector(".welcomeImage");
const userImage = document.querySelector(".header-profile--userImage");

const totalFrames = 600;
let length, path;
let currentFrame = 0;
let handle = 0;

//changing dropshadow based on mouse position
(() => {
  app.addEventListener("mousemove", (e) => {
    const cursorPosition = `600px at ${e.pageX}px ${e.pageY}px`;
    dropShadow.style.background = `radial-gradient(
      ${cursorPosition},
      rgba(29, 78, 216, 0.15),
      transparent 80%
    )`;
  });
})();

//maniputaling active class of nav items on click and implementing smooth scrolling
(() => {
  nav.addEventListener("click", (e) => {
    e.preventDefault();
    const closesetNavItem = e.target.closest(".navItem");
    if (closesetNavItem) {
      const id = closesetNavItem.getAttribute("href");

      navItem.forEach((item) => item.classList.remove("active"));
      closesetNavItem.classList.add("active");
      const headerOffset = id === "#about" ? 200 : 80;
      const elementPosition = document
        .querySelector(id)
        .getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
})();

//draw animation for welcome svg
const draw = () => {
  const progress = currentFrame / totalFrames;

  if (progress > 0.25) {
    path.style.strokeDashoffset = "7156";
    path.style.fill = "rgb(226 232 240)";
    window.cancelAnimationFrame(handle);
  } else {
    currentFrame++;
    path.style.strokeDashoffset = Math.floor(length * (1 - [progress]));
    handle = window.requestAnimationFrame(draw);
  }
};

//initialising welcome svg animations and userprofle src
(() => {
  if (userImage) userImage.src = user;

  welcomeImage?.addEventListener("load", () => {
    const doc = welcomeImage?.contentDocument;
    path = doc?.getElementById("welcome_path");

    if (path) {
      length = path.getTotalLength();

      path.style.stroke = "rgb(226 232 240)";
      path.style.strokeDasharray = length + " " + length;
      path.style.fill = "rgb(15 23 42)";

      draw();
    }
  });
})();

/* intersection observer callback function to active nav 
 item depending on viewport visiblity of particular item */
const callback = (entries) => {
  entries.forEach((entry) => {
    const { target, isIntersecting } = entry;
    const element = document.querySelector(`.navItem-${target.id}`);
    if (isIntersecting) {
      console.log('inside isintersecting', navItem, element)
      navItem.forEach((el) => el.classList.remove("active"));
      element?.classList.add("active");
    }
  });
};

// intersection observer api to change nav item on scroll
(() => {
  let options = {
    root: null,
    threshold: [0.6],
    rootMargin: "0%",
  };

  let observer = new IntersectionObserver(callback, options);
  observer.observe(about);
  observer.observe(experience);
  // observer.observe(project);
  observer.observe(footer);
})();
