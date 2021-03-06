const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    ),
  body = document.body,
  headerBody = document.querySelector(".header__body"),
  sections = document.querySelectorAll("section"),
  ibgElements = document.querySelectorAll(".ibg"),
  copyBlock = document.querySelector(".footer__copy"),
  moneyBlock = document.querySelector(".icon-money"),
  phoneInput = document.querySelectorAll('input[name="phone"]'),
  im = new Inputmask("+99 (999) 999-99-99"),
  form = document.querySelector(".contacts__form"),
  contactsSection = document.querySelector(".contacts"),
  consultationButton = document.querySelector(".header__btn");

// headerButton click

if (consultationButton) {
  consultationButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: contactsSection.getBoundingClientRect().top,
      behavior: "smooth",
    });
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
      const src = ibgElement
        .querySelector("img")
        .currentSrc.replace("http://localhost:3000", ".");
      ibgElement.style.setProperty("background-image", `url('${src}')`);
    }
  });
}

// Input mask, validation form

im.mask(phoneInput);

// form validate, sending

form.addEventListener("submit", formSend);

async function formSend(e) {
  e.preventDefault();

  const error = formValidate(form),
    formData = new FormData(form);

  if (error === 0) {
    contactsSection.classList.add("sending");
    const response = await fetch("sendmail.php", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const result = await response.json();
      alert(result.message);
      form.reset();
      contactsSection.classList.remove("sending");
    } else {
      form.reset();
      alert("Error!");
      contactsSection.classList.remove("sending");
    }
  }
}

function formValidate(form) {
  let error = 0;
  const validateInputs = form.querySelectorAll(".validate");

  for (let i = 0; i < validateInputs.length; i++) {
    const inputElement = validateInputs[i];
    formRemovError(inputElement);
    if (inputElement.classList.contains("req") && inputElement.value === "") {
      formAddError(inputElement);
      error++;
      inputElement.nextElementSibling.innerHTML = "?????? ???????? ?????????? ??????????????????";
      inputElement.nextElementSibling.style.display = "block";
    } else if (inputElement.classList.contains("email")) {
      if (isEmail(inputElement)) {
        formAddError(inputElement);
        error++;
        inputElement.nextElementSibling.innerHTML = "?????????????? ?????????????????? email";
        inputElement.nextElementSibling.style.display = "block";
      }
    }
  }
  return error;
}

function formAddError(inputElement) {
  inputElement.parentElement.classList.add("error");
  inputElement.classList.add("error");
}
function formRemovError(inputElement) {
  inputElement.parentElement.classList.remove("error");
  inputElement.classList.remove("error");
  inputElement.nextElementSibling.style.display = "none";
}
function isEmail(inputElement) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
    inputElement.value
  );
}

// moneyBlock click

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("icon-money")) {
    e.target.classList.toggle("active");
  }
});

// footer date

if (copyBlock) {
  const copyBlockText = copyBlock.innerHTML;
  copyBlock.innerHTML = `${new Date().getFullYear()} ${copyBlockText}`;
}

// slider

const swiper = new Swiper(".swiper-container", {
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
