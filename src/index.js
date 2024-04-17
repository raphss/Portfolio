/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import './style.css';
import navbar from './navbar.js';
import home from './home.js';
import about from './about.js';
import projects from './projects.js';
import contact from './contact.js';
import footer from './footer.js';

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

  const projectsSection = projects();
  projectsSection.id = 'projetos';

  const contactSection = contact();
  contactSection.id = 'contato';

  const footerModule = footer();

  return {
    nav,
    homeSection,
    aboutSection,
    projectsSection,
    contactSection,
    footerModule,
  };
}

const elements = component();
document.body.prepend(elements.nav);
document.body.appendChild(elements.homeSection);
document.body.appendChild(elements.aboutSection);
document.body.appendChild(elements.projectsSection);
document.body.appendChild(elements.contactSection);
document.body.appendChild(elements.footerModule);

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
  if (navLinks[i].textContent === 'Projetos') {
    navLinks[i].href = '#projetos';
  }
  if (navLinks[i].textContent === 'Contato') {
    navLinks[i].href = '#contato';
  }
}

window.addEventListener('scroll', () => {
  if (isScrollingFromNavClick) {
    return;
  }

  const currentScrollPosition = window.pageYOffset;

  const sections = [
    elements.homeSection,
    elements.aboutSection,
    elements.projectsSection,
    elements.contactSection,
  ];
  const sectionIds = ['#', '#sobre', '#projetos', '#contato'];

  removeActiveClass(navLinks);

  const navbarHeight = window.innerHeight * 0.1; // 10vh

  for (let i = 0; i < sections.length; i++) {
    const sectionTop = sections[i].offsetTop - navbarHeight;
    const sectionBottom = sectionTop + sections[i].offsetHeight;

    if (
      currentScrollPosition >= sectionTop &&
      currentScrollPosition < sectionBottom
    ) {
      const activeLink = document.querySelector(`a[href="${sectionIds[i]}"]`);
      if (activeLink) {
        activeLink.classList.remove('active');
        activeLink.classList.add('active');
      }
    } else {
      const activeLink = document.querySelector(`a[href="${sectionIds[i]}"]`);
      if (activeLink) {
        activeLink.classList.remove('active');
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

const blurDivs = document.querySelectorAll('.blur-load');
blurDivs.forEach((div) => {
  const img = div.querySelector('img');

  function loaded() {
    div.classList.add('loaded');
  }

  if (img.complete) {
    loaded();
  } else {
    img.addEventListener('load', loaded);
  }
});

const sectionsSelection = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('fade-in');
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  },
  {
    threshold: 0.2,
    // eslint-disable-next-line prettier/prettier
  }
);

sectionsSelection.forEach((section) => {
  observer.observe(section);
});
