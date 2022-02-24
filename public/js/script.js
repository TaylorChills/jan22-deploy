document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("finance-app JS imported successfully!");
  },
  false
);


const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})