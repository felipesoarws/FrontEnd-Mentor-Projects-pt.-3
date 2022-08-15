// card inputs
const cards_content_name = document.getElementById("name");
const card_numbers_input = document.getElementById("card_numbers_input");
const cards_content_date_1 = document.getElementById("date_1");
const cards_content_date_2 = document.getElementById("date_2");
const cards_content_cvc = document.getElementById("cards_content_cvc");

const hasCharacters = (value) => {
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

const displayError = (input) => {
  document.querySelector(`.${input} + span`).classList.add("show");
  document.querySelector(`.${input}`).style.boxShadow = "0 0 1px 1px #e74f4f";
};

const stillHasError = (el) => {
  if (el.classList[0] == "card-name") {
    cards_content_name.innerHTML.split("").forEach((letter) => {
      if (letter >= 0 || letter <= 9) {
        letter = Number(letter);
      }

      if (typeof letter == "string") {
        cards_content_name.innerHTML = el.value;
        inputWithoutError(el.classList[0]);
      } else {
        displayError(el.classList[0]);
      }
    });
  } else if (el.classList[0] == "card-number") {
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
