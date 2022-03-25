const menu = document.querySelector(".menu");
const navOpen = document.querySelector(".hamburger");
const navClose = document.querySelector(".close");

const navLeft = menu.getBoundingClientRect().left;
navOpen.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.add("show");
    document.body.classList.add("show");
    navBar.classList.add("show");
  }
});

navClose.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.remove("show");
    document.body.classList.remove("show");
    navBar.classList.remove("show");
  }
});

// Fixed Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {
  if (!link) return;
  link.addEventListener("click", e => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);

    const element = document.getElementById(id);
    const fixNav = navBar.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    menu.classList.remove("show");
    document.body.classList.remove("show");
  });
});

$(document).ready(function() {
  //contact us, show message sent
  $("#contactus-btn").click(function(event) {
      event.preventDefault();

      let firstName = $("#first-name").val();
      // let lastName = $("#last-name").val();
      // let contactNum = $("#contact-num").val(); 
      // let contactEmail = $("#contact-email").val();
      // let textArea = $("#text-area").val();

      let messageSent = document.getElementById("message-sent");

      if(($("#first-name").val() && $("#last-name").val() && $("#contact-num").val() && $("#contact-email").val() && $("#text-area").val()) !== "") {
          messageSent.innerHTML = `<p>${firstName}, your message has been received. Thankyou for contacting us.</p>`
      } else {
          messageSent.innerHTML = `<p>Please fill all the required details.</p>`
      }
  })
});
