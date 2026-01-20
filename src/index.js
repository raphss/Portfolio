/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
import './style.css';
import navbar from './navbar.js';
import home from './home.js';
import about from './about.js';
import projects from './projects.js';
import contact from './contact.js';
import footer from './footer.js';

import labels from './i18n/labels';
import { getLocale } from './i18n/locale';
import {
  getContent,
  getProjects,
  normalizeContent,
  normalizeProjects,
} from './api';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

window.addEventListener('localechange', () => {
  window.location.reload();
});

async function component() {
  const locale = getLocale();
  const t = labels[locale];

  let content = {};
  try {
    content = normalizeContent(await getContent(locale));
  } catch (err) {
    content = normalizeContent({});
  }

  let projectsData = { projects: [] };
  try {
    projectsData = normalizeProjects(await getProjects(locale));
  } catch (err) {
    projectsData = normalizeProjects({});
  }

  const nav = navbar(t, locale);

  const homeSection = home(content, t, locale);
  homeSection.id = '#';

  const aboutSection = about(content, t);
  aboutSection.id = 'about';

  const projectsSection = projects(projectsData);
  projectsSection.id = 'projects';

  const contactSection = contact(t, locale);
  contactSection.id = 'contact';

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

const elements = await component();
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

  const { section } = navLinks[i].dataset;

  if (section === 'home') navLinks[i].href = '#';
  if (section === 'about') navLinks[i].href = '#about';
  if (section === 'projects') navLinks[i].href = '#projects';
  if (section === 'contact') navLinks[i].href = '#contact';
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
  const sectionIds = ['#', '#about', '#projects', '#contact'];

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
  },
);

sectionsSelection.forEach((section) => {
  observer.observe(section);
});
