/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import './style.css';
import navbar from './navbar.js';
import home from './home.js';
import about from './about.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('Looks like we are in production mode!');
}

function component() {
  const nav = navbar();
  const homeSection = home();
  homeSection.id = '#';
  const aboutSection = about();
  aboutSection.id = 'sobre';

  return {
    nav,
    homeSection,
    aboutSection,
  };
}

const elements = component();
document.body.prepend(elements.nav);
document.body.appendChild(elements.homeSection);
document.body.appendChild(elements.aboutSection);

const navLinks = document.getElementsByClassName('nav-link');
let isScrollingFromNavClick = false;

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function () {
    removeActiveClass(navLinks);
    this.classList.add('active');
    isScrollingFromNavClick = true;
    setTimeout(() => {
      isScrollingFromNavClick = false;
    }, 500);
  });

  if (navLinks[i].textContent === 'Inicio') {
    navLinks[i].href = '#';
  }
  if (navLinks[i].textContent === 'Sobre') {
    navLinks[i].href = '#sobre';
  }
}

window.addEventListener('scroll', () => {
  if (isScrollingFromNavClick) {
    return;
  }

  const currentScrollPosition = window.pageYOffset;

  const sections = [elements.homeSection, elements.aboutSection];
  const sectionIds = ['#', '#sobre'];

  removeActiveClass(navLinks);

  for (let i = 0; i < sections.length; i++) {
    const sectionTop = sections[i].offsetTop;
    const sectionBottom = sectionTop + sections[i].offsetHeight;

    if (
      currentScrollPosition >= sectionTop &&
      currentScrollPosition < sectionBottom
    ) {
      const activeLink = document.querySelector(`a[href="${sectionIds[i]}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }
});

// eslint-disable-next-line no-shadow
function removeActiveClass(navLinks) {
  for (let j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove('active');
  }
}
