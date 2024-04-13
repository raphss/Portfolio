import { Collapse } from 'bootstrap';

function navbar() {
  const nav = document.createElement('nav');
  const divContainer = document.createElement('div');
  const button = document.createElement('button');
  const span = document.createElement('span');
  const divCollapse = document.createElement('div');
  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  const a1 = document.createElement('a');
  const li2 = document.createElement('li');
  const a2 = document.createElement('a');
  const li3 = document.createElement('li');
  const a3 = document.createElement('a');
  const li4 = document.createElement('li');
  const a4 = document.createElement('a');

  nav.setAttribute(
    'class',
    // eslint-disable-next-line prettier/prettier
    'navbar navbar-expand-sm navbar-dark p-3 bg-darker'
  );
  divContainer.setAttribute(
    'class',
    // eslint-disable-next-line prettier/prettier
    'container navbar-container d-flex justify-content-end'
  );
  button.setAttribute('class', 'navbar-toggler my-2');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'collapse');
  button.setAttribute('data-bs-target', '#navbarNav');
  button.setAttribute('aria-controls', 'navbarNav');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Toggle navigation');
  span.setAttribute('class', 'navbar-toggler-icon');
  divCollapse.setAttribute('class', 'collapse navbar-collapse');
  divCollapse.setAttribute('id', 'navbarNav');
  ul.setAttribute('class', 'navbar-nav justify-content-end w-100');
  li1.setAttribute('class', 'nav-item');
  a1.setAttribute('href', '#');
  a1.setAttribute('class', 'nav-link active');
  a1.setAttribute('id', 'home-page');
  a1.textContent = 'Inicio';
  li2.setAttribute('class', 'nav-item');
  a2.setAttribute('href', '#');
  a2.setAttribute('class', 'nav-link');
  a2.setAttribute('id', 'about-page');
  a2.textContent = 'Sobre';
  li3.setAttribute('class', 'nav-item');
  a3.setAttribute('href', '#');
  a3.setAttribute('class', 'nav-link');
  a3.setAttribute('id', 'projects-page');
  a3.textContent = 'Projetos';
  li4.setAttribute('class', 'nav-item');
  a4.setAttribute('href', '#');
  a4.setAttribute('class', 'nav-link');
  a4.setAttribute('id', 'contact-page');
  a4.textContent = 'Contato';

  li1.appendChild(a1);
  li2.appendChild(a2);
  li3.appendChild(a3);
  li4.appendChild(a4);
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  ul.appendChild(li4);
  divCollapse.appendChild(ul);
  button.appendChild(span);
  divContainer.appendChild(button);
  divContainer.appendChild(divCollapse);

  [a1, a2, a3, a4].forEach((link) => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        const bsCollapse = new Collapse(divCollapse, { toggle: false });
        bsCollapse.hide();
      }, 200);
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) {
      setTimeout(() => {
        const bsCollapse = new Collapse(divCollapse, { toggle: false });
        bsCollapse.hide();
      }, 200);
    }
  });

  nav.appendChild(divContainer);

  return nav;
}

export default navbar;
