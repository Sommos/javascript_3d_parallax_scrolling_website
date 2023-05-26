// set constants for the DOM elements
const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

// set variables for the mouse position
let xValue = 0;
let yValue = 0;
let rotateDegree = 0;

// set the parallax effect and update based on cursor position and speed
function update(cursorPosition) {
  parallax_el.forEach((el) => {
    // get the speed values from the data attributes
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    // calculate the z value based on the cursor position
    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    // set the transform style
    el.style.transform = `perspective(2300px) 
      translateZ(${zValue * speedz}px) 
      rotateY(${rotateDegree * rotateSpeed}deg) 
      translateX(calc(-50% + ${-xValue * speedx}px)) 
      translateY(calc(-50% + ${yValue * speedy}px))`;
  });
} 

// update the parallax effect on mousemove
update(0);

// disable the double click highlight
document.addEventListener.EventListener("mousedown", function(event) {
  // check if mousedown has been pressed twice
  if (event.detail === 2) {
    // prevent the default action
    event.preventDefault();
  }
}, false);

// add event listener to the window to update the mouse position
window.addEventListener("mousemove", (e) => {
  // check if the timeline is active
  if (timeline.isActive()) {
    return;
  }
  // update the mouse position
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;
  // update the rotate degree
  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
  // update the parallax effect
  update(e.clientX);
});

// set the max height of the main element
if (window.innerWidth >= 725) {
  // set the max height of the main element
  main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
  // set the max height of the main element
  main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

// set the timeline based on gsap library
let timeline = gsap.timeline();

// set the timeline to start after the page is loaded
setTimeout(
  () => {
    // set the transition for the parallax elements
    parallax_el.forEach((el) => {
      // set the transition for the parallax elements
      el.style.transition = "0.45s cubic-bezier(0.2, 0.49, 0.32, 0.99)";
    });
  },

  // set the timeline to start after the page is loaded
  timeline.endTime() * 1000
);

// filter the elements that are not text, and reverse the array
Array.from(parallax_el)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        duration: 3.5,
        ease: "power3.out",
      },
      "1"
    );
  });

timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top +
        200,
      duration: 2,
    },
    "2.5"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "3"
  )
  .from(".text p", {
    y: -20,
    opacity: 0,
    duration: 1.5,
  })
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );
