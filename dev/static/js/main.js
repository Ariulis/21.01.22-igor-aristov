const ibgElements = document.querySelectorAll(".ibg"),
  navigate = document.querySelector(".navigate"),
  isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    ),
  body = document.body,
  menuLinkGoTo = document.querySelectorAll("[data-goto]"),
  menuLinks = document.querySelectorAll(".menu__link"),
  navigateObject = document.querySelector(".navigate"),
  goTopButton = document.querySelector(".go-top"),
  headerElement = document.querySelector("header"),
  menuBurger = document.querySelector(".menu-icon"),
  menu = document.querySelector(".menu__list"),
  headerBody = document.querySelector(".header__body"),
  sections = document.querySelectorAll("section"),
  copyBlock = document.querySelector(".footer__copy");

// footer date

if (copyBlock) {
  const copyBlockText = copyBlock.innerHTML;
  copyBlock.innerHTML = `${new Date().getFullYear()} ${copyBlockText}`;
}

// menuBurger click

menuBurger.addEventListener("click", clickMenuBurger);

function clickMenuBurger() {
  menuBurger.classList.toggle("active");
  body.classList.toggle("_lock");
  menu.classList.toggle("_open");
  navigateObject.classList.toggle("_open");
}

// smooth scroll

if (menuLinkGoTo.length > 0) {
  menuLinkGoTo.forEach((link) => {
    link.addEventListener("click", function (e) {
      smoothScrollEvent(e);
      if (menuBurger.classList.contains("active")) {
        clickMenuBurger();
      }
    });
  });
}

function smoothScrollEvent(event) {
  event.preventDefault();
  const clickObject = event.target,
    objName = clickObject.classList.contains("go-top")
      ? "header"
      : clickObject.dataset.goto,
    targetPosition = document
      .querySelector(objName)
      .getBoundingClientRect().top,
    menuHeight = navigateObject.offsetHeight;
  distance = clickObject.classList.contains("go-top")
    ? targetPosition + scrollY
    : targetPosition + scrollY - menuHeight;

  window.scrollTo({
    top: distance,
    behavior: "smooth",
  });
}

// toggle active class for menu link

function toggleActiveClassMenuLink(distance) {
  const menuHeight = navigateObject.clientHeight;

  sections.forEach((section, idx) => {
    if (section.offsetTop - menuHeight - 50 <= distance) {
      removeClassInArrElements(menuLinks, "active");
      menuLinks[idx].classList.add("active");
    }
  });

  if (headerElement.clientHeight - 100 >= distance) {
    removeClassInArrElements(menuLinks, "active");
  }
}

function removeClassInArrElements(arr, className) {
  arr.forEach((element) => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });
}

// isMobile

document.addEventListener("DOMContentLoaded", function () {
  if (isMobile) {
    body.classList.add("_touch");
  } else {
    body.classList.add("_pc");
  }
});

// ibg

if (ibgElements.length > 0) {
  ibgElements.forEach((ibgElement) => {
    if (ibgElement.querySelector("img")) {
      const src = ibgElement.querySelector("img").getAttribute("src");
      ibgElement.style.setProperty("background-image", `url(${src})`);
    }
  });
}

// goTopButton click

goTopButton.addEventListener("click", smoothScrollEvent);

// window scroll

window.addEventListener("scroll", function () {
  const distance = this.scrollY;
  if (distance > 80) {
    navigateObject.classList.add("scroll");
  } else {
    navigateObject.classList.remove("scroll");
  }
  if (goTopButton) {
    goTopButtonFunction();
  }
  if (body.classList.contains("_pc")) {
    toggleActiveClassMenuLink(distance);
  }
});

function goTopButtonFunction() {
  if (window.pageYOffset > 300) {
    if (!goTopButton.classList.contains("go-top-entrance")) {
      goTopButton.classList.remove("go-top-exit");
      goTopButton.classList.add("go-top-entrance");
      goTopButton.style.display = "block";
    }
  } else {
    if (goTopButton.classList.contains("go-top-entrance")) {
      goTopButton.classList.remove("go-top-entrance");
      goTopButton.classList.add("go-top-exit");
      setTimeout(function () {
        goTopButton.style.display = "none";
      }, 350);
    }
  }
}

// slider

const swiper = new Swiper(".swiper-container", {
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  autoHeight: true,
  slidesPerView: 1,
  speed: 800,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
