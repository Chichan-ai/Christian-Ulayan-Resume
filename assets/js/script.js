'use strict';

/**
 * ELEMENT TOGGLE FUNCTION
 */
const elementToggleFunc = (elem) => elem.classList.toggle("active");


/**
 * SIDEBAR LOGIC
 */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}


/**
 * TESTIMONIALS MODAL LOGIC
 */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Optimized with forEach and safer selector checks
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
    if (modalText && text) modalText.innerHTML = text.innerHTML;
    
    testimonialsModalFunc();
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);


/**
 * PORTFOLIO FILTER LOGIC
 */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // Kept typo "selecct" to match your HTML
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));
}

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
    const category = item.dataset.category;
    if (selectedValue === "all" || selectedValue === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Select dropdown items logic
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(value);
  });
});

// Filter button logic
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(value);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});


/**
 * PORTFOLIO IMAGE MODAL (The "Eye" Icon Logic)
 */
const portfolioModal = document.getElementById("myModal");
const portfolioModalImg = document.getElementById("img01");
const portfolioCaption = document.getElementById("caption");
const portfolioCloseBtn = document.querySelector(".close");
const projectBtns = document.querySelectorAll(".project-item-icon-box");

projectBtns.forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const projectItem = this.closest(".project-item");
    const projectImg = projectItem?.querySelector("img");

    if (portfolioModal && portfolioModalImg && projectImg) {
      portfolioModal.style.display = "block";
      portfolioModalImg.src = projectImg.src;
      if (portfolioCaption) portfolioCaption.innerHTML = projectImg.alt;
    }
  });
});

if (portfolioCloseBtn) {
  portfolioCloseBtn.addEventListener("click", () => {
    portfolioModal.style.display = "none";
  });
}


/**
 * CONTACT FORM LOGIC
 */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      formBtn.disabled = !form.checkValidity();
    });
  });
}


/**
 * PAGE NAVIGATION LOGIC
 */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase().trim();

    pages.forEach((page, i) => {
      if (targetPage === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    });
  });
});

// Close portfolio modal if clicking outside
window.addEventListener("click", (event) => {
  if (event.target === portfolioModal) {
    portfolioModal.style.display = "none";
  }
});

/**
 * THEME TOGGLE LOGIC
 */
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Check for saved user preference on load
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
  themeIcon.setAttribute("name", "sunny-outline");
}

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  
  // Update icon and save preference
  if (body.classList.contains("light-mode")) {
    themeIcon.setAttribute("name", "sunny-outline");
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.setAttribute("name", "moon-outline");
    localStorage.setItem("theme", "dark");
  }
});

