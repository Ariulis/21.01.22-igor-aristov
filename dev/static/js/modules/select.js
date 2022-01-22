/* Custom Select */
//Получаем все "select" по селектору
const selects = document.querySelectorAll(".select__item");
//переборка по полученным "select"
for (let i = 0; i < selects.length; i++) {
  const select = selects[i];
  //получаем все "option" внутри "select"
  const options = select.querySelectorAll("option");
  //создаем кастомный "select"
  const cSelect = document.createElement("div");
  const cSelectList = document.createElement("div");
  const cSelectCurrent = document.createElement("div");
  cSelectCurrent.setAttribute("tabindex", "0");

  select.setAttribute("tabindex", "-1");
  //задем классы и атрибуты кастомному "select"
  cSelect.className = "custom-select";
  cSelectList.className = "custom-select__list";
  cSelectCurrent.className = "custom-select__current";
  //по умолчанию у button будет type="submit", поэтому меням на type="button" чтобы избежать отправку формы при клие на кастомный "select"
  cSelectCurrent.setAttribute("type", "button");
  //создаем вложенность созданных элементов
  cSelect.append(cSelectCurrent, cSelectList);
  //добавляем кастоный "select" сразу после оргинального "select"
  select.after(cSelect);
  //получаем список и значения "option" из "select", затем создаём кастомный "option" для кастомного "select"
  const createCustomDom = function (x, y) {
    let selectItems = "";
    for (var i = 0; i < options.length; i++) {
      selectItems +=
        '<button type="button" class="custom-select__item" data-value="' +
        options[i].value +
        '">' +
        options[i].text +
        "</button>";
    }
    cSelectList.innerHTML = selectItems;
    x(), y();
  };
  //открываем-закрываем выпадающий список по клику
  const toggleClass = () => {
    cSelect.classList.toggle("custom-select--show");
  };
  //присваиваем текстовое первое значение "option" в кастомном "select"
  const currentTextValue = () =>
    (cSelectCurrent.textContent = cSelectList.children[0].textContent);
  //получаем и задаем значения text/value
  const currentValue = () => {
    const items = cSelectList.children;
    for (var el = 0; el < items.length; el++) {
      let selectValue = items[el].getAttribute("data-value");
      let selectText = items[el].textContent;
      items[el].addEventListener("click", () => {
        cSelect.classList.remove("custom-select--show");
        cSelectCurrent.textContent = selectText;
        select.value = selectValue;
      });
    }
  };
  const desctopFn = () => {
    cSelectCurrent.addEventListener("click", toggleClass);
    cSelectCurrent.addEventListener("keydown", (event) => {
      if (event.code == "Enter" || event.code == "Escape") {
        toggleClass();
      }
    });
  };
  const mobileFn = () => {
    for (let j = 0; j < selects.length; j++) {
      let mobileSelect = selects[j];
      mobileSelect.classList.add("select__item--mobile");
      mobileSelect.addEventListener("change", () => {
        mobileSelect.nextElementSibling.querySelector(
          ".custom-select__current"
        ).textContent = mobileSelect.value;
      });
    }
  };
  createCustomDom(currentTextValue, currentValue);
  //закрываем выпадающий список по клику вне области кастомного селекта
  document.addEventListener("mouseup", (e) => {
    if (!cSelect.contains(e.target))
      cSelect.classList.remove("custom-select--show");
  });
  detectmob(mobileFn, desctopFn);
  function detectmob(x, y) {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      x();
    } else {
      y();
    }
  }
}
// -- //
