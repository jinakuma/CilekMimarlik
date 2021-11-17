// Carousel Script

const slidesEl = document.getElementById("carousel-slides");
const slides = Array.from(slidesEl.children);
const nextButton = document.querySelector(".carousel-button-right");
const prevButton = document.querySelector(".carousel-button-left");
const indicatorsNav = document.querySelector(".carousel-nav");
const indicators = Array.from(indicatorsNav.children);
const intervalTime = 5000;
let slideInterval;

const slideAnimation = () => {
  const currentSlide = slidesEl.querySelector(".current-slide");
  let nextSlide;
  if (currentSlide.nextElementSibling) {
    nextSlide = currentSlide.nextElementSibling;
  } else {
    nextSlide = slides[0];
  }

  const currentIndicator = indicatorsNav.querySelector(".current");

  let nextIndicator;
  if (currentIndicator.nextElementSibling) {
    nextIndicator = currentIndicator.nextElementSibling;
  } else {
    nextIndicator = indicators[0];
  }

  setTimeout(() => {
    moveToSlide(slidesEl, currentSlide, nextSlide);
    updateIndicators(currentIndicator, nextIndicator);
  });
};

slideInterval = setInterval(slideAnimation, intervalTime);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

const moveToSlide = (slidesEl, currentSlide, targetSlide) => {
  slidesEl.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateIndicators = (currentIndicator, targetIndicator) => {
  currentIndicator.classList.remove("current");
  targetIndicator.classList.add("current");
};

nextButton.addEventListener("click", (e) => {
  const currentSlide = slidesEl.querySelector(".current-slide");
  let nextSlide;
  if (currentSlide.nextElementSibling) {
    nextSlide = currentSlide.nextElementSibling;
  } else {
    nextSlide = slides[0];
  }
  const currentIndicator = indicatorsNav.querySelector(".current");
  let nextIndicator;
  if (currentIndicator.nextElementSibling) {
    nextIndicator = currentIndicator.nextElementSibling;
  } else {
    nextIndicator = indicators[0];
  }

  moveToSlide(slidesEl, currentSlide, nextSlide);
  updateIndicators(currentIndicator, nextIndicator);
  clearInterval(slideInterval);
  slideInterval = setInterval(slideAnimation, intervalTime);
});

prevButton.addEventListener("click", (e) => {
  const currentSlide = slidesEl.querySelector(".current-slide");
  let prevSlide;
  if (currentSlide.previousElementSibling) {
    prevSlide = currentSlide.previousElementSibling;
  } else {
    prevSlide = slides[slides.length - 1];
  }
  const currentIndicator = indicatorsNav.querySelector(".current");
  let prevIndicator;
  if (currentIndicator.previousElementSibling) {
    prevIndicator = currentIndicator.previousElementSibling;
  } else {
    prevIndicator = indicators[indicators.length - 1];
  }

  moveToSlide(slidesEl, currentSlide, prevSlide);
  updateIndicators(currentIndicator, prevIndicator);
  clearInterval(slideInterval);
  slideInterval = setInterval(slideAnimation, intervalTime);
});

indicatorsNav.addEventListener("click", (e) => {
  const targetIndicator = e.target.closest("button");
  if (!targetIndicator) return;

  const currentSlide = slidesEl.querySelector(".current-slide");
  const currentIndicator = indicatorsNav.querySelector(".current");
  const targetIndex = indicators.findIndex(
    (indicator) => indicator === targetIndicator
  );
  const targetSlide = slides[targetIndex];

  moveToSlide(slidesEl, currentSlide, targetSlide);
  updateIndicators(currentIndicator, targetIndicator);
});

// Navbar

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.2
        }s`;
      }
    });

    // Burger animation
    burger.classList.toggle("toggle");
  });
};

navSlide();

const navLinks = document.querySelectorAll(".nav-links li");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const activeLink = document.querySelector(".active");
    activeLink.classList.remove("active");
    link.classList.add("active");
  });
});

// Sticky menu background

window.addEventListener("scroll", function () {
  if (window.scrollY > 150) {
    document.querySelector("#navbar").style.opacity = 0.9;
  } else {
    this.document.querySelector("#navbar").style.opacity = 1;
  }
});

// Smooth scrolling
$("#navbar a").on("click", function (event) {
  if (this.hash !== "") {
    event.preventDefault();

    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - 80,
      },
      800
    );
  }
});

// Projects

