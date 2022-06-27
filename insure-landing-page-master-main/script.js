const iconOpenMenu = document.getElementById("hambIcon");
const iconCloseMenu = document.getElementById("closeIcon");
const menuMobile = document.getElementById("menuMob");

menuMobile.addEventListener("click", (e) => {
  var target = e.target.tagName;
  if (target == "A") {
    closeMenu();
  }
});

iconOpenMenu.addEventListener("click", () => {
  openMenu();
});

iconCloseMenu.addEventListener("click", (e) => {
  closeMenu();
});





function addClass(el, classToAdd) {
  el.classList.add(classToAdd);
}

function removeClass(el, classToRemove) {
  el.classList.remove(classToRemove);
}

function openMenu() {
  removeClass(menuMobile, "hide");
  addClass(menuMobile, "show");
}

function closeMenu() {
  removeClass(menuMobile, "show");
  addClass(menuMobile, "hide");
}
