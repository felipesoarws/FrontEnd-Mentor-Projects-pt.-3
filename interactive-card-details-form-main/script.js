// cards
const inputs_card = document.querySelector("main .inputs");
const thank_you_page = document.querySelector("main .thank_you_page");

// card inputs
const cards_content_name = document.getElementById("name");
const card_numbers_input = document.getElementById("card_numbers_input");
const cards_content_date_1 = document.getElementById("date_1");
const cards_content_date_2 = document.getElementById("date_2");
const cards_content_cvc = document.getElementById("cards_content_cvc");
const check_inputs = document.querySelectorAll(".inputs input");

// card buttons
const confirm_button = document.getElementById("thank_you_page_confirm");
const continue_button = document.getElementById("thank_you_page_continue");

// default stats
const default_stats = [`000`, "0000 0000 0000 0000", "YOUR NAME", `00`, `00`];

const hasCharacters = (value) => {
  console.log(value);
  return !/^\d+$/.test(value);
};

const checkStatus = (el) => {
  if (el.value.length > el.maxLength)
    el.value = el.value.slice(0, el.maxLength);

  switch (el.classList[0]) {
    case "card-name":
      cards_content_name.innerHTML = el.value;

      if (cards_content_name.innerHTML.length < 1)
        return (cards_content_name.innerHTML = "Your name");

      cards_content_name.innerHTML.split("").forEach((letter) => {
        if (letter >= 0 || letter <= 9) {
          letter = Number(letter);
        }

        if (typeof letter == "string") {
          cards_content_name.innerHTML = el.value;
        } else {
          hasError(el);
        }

        stillHasError(el);
      });

      break;
    case "card-number":
      card_numbers_input.innerHTML = el.value;

      if (card_numbers_input.innerHTML.length < 1)
        return (card_numbers_input.innerHTML = "0000 0000 0000 0000");

      card_numbers_input.innerHTML.split("").forEach((letter) => {
        if (letter >= 0 || letter <= 9) {
          letter = Number(letter);
        }

        if (typeof letter == "number") {
          card_numbers_input.innerHTML = el.value;
        } else {
          hasError(el);
        }

        stillHasError(el);
      });

      const newValue = el.value.split(" ").join("");
      el.value = formatCreditCardNumber(newValue);

      break;
    case "month-number":
      cards_content_date_1.innerHTML = el.value;

      if (cards_content_date_1.innerHTML.length > 0) {
        if (cards_content_date_1.innerHTML > 11) {
          el.value = 12;
          cards_content_date_1.innerHTML = "12";
        } else if (
          (cards_content_date_1.innerHTML < 10) &
          (cards_content_date_1.innerHTML > 0)
        ) {
          cards_content_date_1.innerHTML = `0${el.value}`;
        } else {
          el.value = 1;
          cards_content_date_1.innerHTML = `01`;
        }
      } else {
        cards_content_date_1.innerHTML = `00`;
        hasError(el);
      }

      stillHasError(el);

      break;
    case "year-number":
      cards_content_date_2.innerHTML = el.value;

      if (el.value > 0) {
        if (el.value < 24) {
          cards_content_date_2.innerHTML = "24";
        } else if (el.value > 35) {
          cards_content_date_2.innerHTML = "35";
        }
      } else {
        cards_content_date_2.innerHTML = `00`;
        hasError(el);
      }

      stillHasError(el);
      break;
    case "cvc-number":
      cards_content_cvc.innerHTML = el.value;

      if (el.value > 0) {
        cards_content_cvc.innerHTML = el.value;
      } else {
        hasError(el);
      }

      stillHasError(el);
      break;

    default:
      break;
  }
};

const formatCreditCardNumber = (str) => {
  return str.match(/.{1,4}/g).join(" ");
};

const hasError = (item) => {
  switch (item.classList[0]) {
    case "card-name":
      displayError("card-name");
      break;
    case "card-number":
      displayError("card-number");
      break;
    case "month-number":
      displayError("month-number");
      break;
    case "year-number":
      displayError("year-number");
      break;
    case "cvc-number":
      displayError("cvc-number");
      break;
    default:
      break;
  }
};

const displayError = (input, errorType) => {
  if (errorType == "empty") {
    document.querySelector(`.${input} + span`).classList.add("show");
    document.querySelector(`.${input} + span`).innerHTML = `Can't be empty.`;
    document.querySelector(`.${input}`).style.boxShadow = "0 0 1px 1px #e74f4f";
  } else if (errorType == "wrong-characters") {
    document.querySelector(`.${input} + span`).innerHTML = `Wrong format.`;
    document.querySelector(`.${input} + span`).classList.add("show");
    document.querySelector(`.${input}`).style.boxShadow = "0 0 1px 1px #e74f4f";
  } else {
    document.querySelector(`.${input} + span`).classList.add("show");
    document.querySelector(`.${input}`).style.boxShadow = "0 0 1px 1px #e74f4f";
  }
};

const stillHasError = (el) => {
  if (el.classList[0] == "card-name") {
    if (cards_content_name.innerHTML.length > 1) {
      cards_content_name.innerHTML.split("").forEach((letter) => {
        if (letter >= 0 || letter <= 9) {
          letter = Number(letter);
        }

        if (typeof letter == "string") {
          cards_content_name.innerHTML = el.value;
          inputWithoutError(el.classList[0]);
        } else {
          displayError(el.classList[0], "wrong-characters");
        }
      });
    } else {
      displayError(el.classList[0], "empty");
    }
  } else if (el.classList[0] == "card-number") {
    if (card_numbers_input.innerHTML.length > 1) {
      card_numbers_input.innerHTML.split("").forEach((letter) => {
        if (letter >= 0 || letter <= 9) {
          letter = Number(letter);
        }

        if (typeof letter == "number") {
          card_numbers_input.innerHTML = el.value;
          inputWithoutError(el.classList[0]);
        } else {
          displayError(el.classList[0], "wrong-characters");
        }
      });
    } else {
      displayError(el.classList[0], "empty");
    }
  } else {
    if (el.value > 0) {
      inputWithoutError(el.classList[0]);
    }
  }
};

const inputWithoutError = (input) => {
  document.querySelector(`.${input} + span`).classList.remove("show");
  document.querySelector(`.${input}`).style.boxShadow = "0 0 1px 1px #3a1152";
};

confirm_button.addEventListener("click", () => {
  check_inputs.forEach((input) => {
    if (input.value == "") {
      displayError(input.classList[0], "empty");
    } else if (check_inputs[1].value.length < 19) {
      displayError(check_inputs[1].classList[0], "empty");
    } else {
      changePages();
    }

    if (check_inputs[4].value.length < 3) {
      displayError(check_inputs[4].classList[0], "empty");
    }
  });
});

const changePages = () => {
  if (thank_you_page.classList[1] != "show_page") {
    inputs_card.classList.remove("show_page");
    thank_you_page.classList.add("show_page");
  } else {
    inputs_card.classList.add("show_page");
    thank_you_page.classList.remove("show_page");
  }
};

continue_button.addEventListener("click", () => {
  changePages();
  resetInputs();
});

const resetInputs = () => {
  const span_titles = document.querySelectorAll(`header span`);

  for (let x = 0; x < default_stats.length; x++) {
    check_inputs[x].value = "";
    span_titles[x].innerHTML = default_stats[x];
  }
};
