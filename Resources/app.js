function eventListeners() {
  const ui = new UI();
  //hide preloader
  window.addEventListener("load", function() {
    ui.hidePreloader();
  });

  //nav button
  document.querySelector(".navBtn").addEventListener("click", function() {
    ui.showNav();
  });

  //video controller
  document
    .querySelector(".video__switch")
    .addEventListener("click", function() {
      ui.videoController();
    });

  //submit form
  document
    .querySelector(".drink__form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastName = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      const value = ui.checkEmpty(name, lastName.email);

      if (value) {
        ui.showFeedback("some form values are missing", "error");
      } else {
        let customer = new Customer(name, lastName, email);
        console.log(customer);
        ui.showFeedback("customer added to the list", "success");
        ui.addCustomer(customer);
        ui.clearFields();
      }
    });
  //show modal
  const links = document.querySelectorAll(".work__item-icon");
  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      ui.showModal(event);
    });
  });
  //hide modal
  document
    .querySelector(".work__modal-close")
    .addEventListener("click", function() {
      ui.closeModal();
    });
}
eventListeners();

//constructor function
function UI() {}
//constructor methods
//hide preloader
UI.prototype.hidePreloader = function() {
  document.querySelector(".preloader").style.display = "none";
};
//toggle nav bar
UI.prototype.showNav = function() {
  document.querySelector(".nav").classList.toggle("nav__show");
};
//play and pause video
UI.prototype.videoController = function() {
  let btn = document.querySelector(".video__switch-btn");
  if (!btn.classList.contains("slide__btn")) {
    btn.classList.add("slide__btn");
    document.querySelector(".video__item").pause();
  } else {
    btn.classList.remove("slide__btn");
    document.querySelector(".video__item").play();
  }
};
//check for empty values
UI.prototype.checkEmpty = function(name, lastName, email) {
  let result;
  if (name === "" || lastName === "" || email === "") {
    result = true;
  } else {
    result = false;
  }
  return result;
};
//show feedback
UI.prototype.showFeedback = function(text, type) {
  const feedback = document.querySelector(".drink__form-feedback");
  if (type === "error") {
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeFeedback("error");
  } else if (type === "success") {
    feedback.classList.add("success");
    feedback.innerText = text;
    this.removeFeedback("success");
  }
};
//remove feedback
UI.prototype.removeFeedback = function(type) {
  setTimeout(function() {
    document.querySelector(".drink__form-feedback").classList.remove(type);
  }, 3000);
};
//add customer
UI.prototype.addCustomer = function(customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<img src="Resources/Images/photograph-${random}.jpg" alt="person" class="person__thumbnail" />
  <h4 class="person__name">${customer.name}</h4>
  <h4 class="person__lastname">${customer.lastName}</h4>`;
  document.querySelector(".drink__card-list").appendChild(div);
};
//clear field
UI.prototype.clearFields = function() {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-lastname").value = "";
  document.querySelector(".input-email").value = "";
};
//show modal
UI.prototype.showModal = function(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work__item-icon")) {
    let id = event.target.parentElement.dataset.id;

    const modal = document.querySelector(".work__modal");
    const modalItem = document.querySelector(".work__modal-item");

    modal.classList.add("work__modal-show");
    modalItem.style.backgroundImage = `url(Resources/Images/work-${id}.jpg)`;
  }
};
//hide modal
UI.prototype.closeModal = function() {
  document.querySelector(".work__modal").classList.remove("work__modal-show");
};

//customer constructor function
function Customer(name, lastname, email) {
  this.name = name;
  this.lastName = lastname;
  this.email = email;
}
