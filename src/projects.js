/* eslint-disable prettier/prettier */
const restaurantImages = [
  './images/1-restaurant.png',
  './images/2-restaurant.png',
  './images/3-restaurant.png',
];

const syslinkImages = [
  './images/1-syslink.png',
  './images/2-syslink.png',
  './images/3-syslink.png',
];

const emailApiImages = [
  './images/1-email.png',
  './images/2-email.png',
  './images/3-email.png',
];

const githubSVG = `
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24"
>
  <path 
    fill="#ffffff"
    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  />
</svg>
`;

function createProjectDiv(images) {
  const div = document.createElement('div');
  div.classList.add('project-div');

  let imgIndex = 0;

  const divImage = document.createElement('div');
  divImage.classList.add('div-image');

  const divBtns = document.createElement('div');
  divBtns.classList.add('slider-buttons');

  const imgElement = document.createElement('img');
  imgElement.src = images[imgIndex];
  divImage.appendChild(imgElement);

  const prevButton = document.createElement('button');
  prevButton.classList.add('btn', 'btn-dark');
  prevButton.textContent = '❮';
  prevButton.addEventListener('click', () => {
    imgIndex = (imgIndex - 1 + images.length) % images.length;
    imgElement.src = images[imgIndex];
  });
  divBtns.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('btn', 'btn-dark');
  nextButton.textContent = '❯';
  nextButton.addEventListener('click', () => {
    imgIndex = (imgIndex + 1) % images.length;
    imgElement.src = images[imgIndex];
  });
  divBtns.appendChild(nextButton);

  div.appendChild(divImage);
  div.appendChild(divBtns);

  return div;
}

function createProjectText(projectName, projectDescription) {
  const divProjectText = document.createElement('div');
  divProjectText.classList.add('div-projects-text');

  const h3Project = document.createElement('h3');
  h3Project.textContent = projectName;

  const pProject = document.createElement('p');
  pProject.innerHTML = projectDescription;

  divProjectText.appendChild(h3Project);
  divProjectText.appendChild(pProject);

  return divProjectText;
}

function projects() {
  const projectsSection = document.createElement('section');
  projectsSection.classList.add('section', 'proj-section');

  const divMainCarousel = document.createElement('div');
  divMainCarousel.classList.add(
    'carousel',
    'slide',
    'w-100',
    'div-main-carousel'
  );
  divMainCarousel.id = 'mainCarouselAuto';
  divMainCarousel.setAttribute('data-bs-ride', 'carousel');

  const divCarouselInner = document.createElement('div');
  divCarouselInner.classList.add('carousel-inner');

  const divCarouselItem1 = document.createElement('div');
  divCarouselItem1.classList.add('carousel-item', 'active');

  const divCarouselItem2 = document.createElement('div');
  divCarouselItem2.classList.add('carousel-item');

  const divCarouselItem3 = document.createElement('div');
  divCarouselItem3.classList.add('carousel-item');

  const divRestaurant = document.createElement('div');
  divRestaurant.classList.add('div-slider');
  const divRestaurantSlider = createProjectDiv(restaurantImages);
  const divRestaurantText = createProjectText(
    'Restaurant Page',
    'Uma página de restaurante de comida japonesa. Apresenta opções do menu, ' +
      'informações de localização, contato e agenda de horários. Desenvolvida com HTML, CSS e JavaScript.'
  );
  /// //////////////////////////////////////////
  const divRestaurantTextButtons = document.createElement('div');
  divRestaurantTextButtons.classList.add('div-projects-buttons');

  const buttonLivePage = document.createElement('button');
  buttonLivePage.classList.add('btn', 'btn-dark');
  buttonLivePage.textContent = 'Live Page';
  buttonLivePage.addEventListener('click', () => {
    window.open('https://restaurantpage.live', '_blank');
  });

  const githubRestaurant = document.createElement('a');
  githubRestaurant.setAttribute(
    'href',
    'https://github.com/raphss/Restaurant-Page'
  );
  githubRestaurant.setAttribute('target', '_blank');
  githubRestaurant.setAttribute('rel', 'noopener noreferrer');
  githubRestaurant.innerHTML = githubSVG;
  githubRestaurant.classList.add('icon');

  divRestaurantTextButtons.appendChild(buttonLivePage);
  divRestaurantTextButtons.appendChild(githubRestaurant);

  divRestaurantText.appendChild(divRestaurantTextButtons);

  divRestaurant.appendChild(divRestaurantSlider);
  divRestaurant.appendChild(divRestaurantText);

  const divSyslink = document.createElement('div');
  divSyslink.classList.add('div-slider');
  const divSyslinkSloder = createProjectDiv(syslinkImages);
  const divSyslinkText = createProjectText(
    'Syslink',
    'Uma aplicação que visa o gerenciamento de soluções para erros encontrados ' +
      'na plataforma <a target="_blank" href="https://www.syslink.com.br/">Syslink</a>. ' +
      'Desenvolvida em Java com interfaces gráficas utilizando Java Swing.'
  );

  const divSyslinkTextButtons = document.createElement('div');
  divSyslinkTextButtons.classList.add('div-projects-buttons');

  const buttonDownloadExe = document.createElement('button');
  buttonDownloadExe.classList.add('btn', 'btn-dark');
  buttonDownloadExe.textContent = 'Baixar Instalador';
  buttonDownloadExe.addEventListener('click', () => {
    window.open('https://github.com/raphss/Syslink/raw/main/dist/Syslink.exe');
  });

  const githubSyslink = document.createElement('a');
  githubSyslink.setAttribute('href', 'https://github.com/raphss/Syslink');
  githubSyslink.setAttribute('target', '_blank');
  githubSyslink.setAttribute('rel', 'noopener noreferrer');
  githubSyslink.innerHTML = githubSVG;
  githubSyslink.classList.add('icon');

  divSyslinkTextButtons.appendChild(buttonDownloadExe);
  divSyslinkTextButtons.appendChild(githubSyslink);

  divSyslinkText.appendChild(divSyslinkTextButtons);

  divSyslink.appendChild(divSyslinkSloder);
  divSyslink.appendChild(divSyslinkText);

  const divEmailApi = document.createElement('div');
  divEmailApi.classList.add('div-slider');
  const divEmailApiSlider = createProjectDiv(emailApiImages);
  const divEmailApiText = createProjectText(
    'Email API',
    'Uma API para enviar emails e armazenar as informações no banco de dados, ' +
      'fornecendo acesso aos detalhes de envio, como remetente, destinatário, assunto, texto e etc. ' +
      'Desenvolvida em Java com Spring Boot.'
  );

  const divEmailApiTextButtons = document.createElement('div');
  divEmailApiTextButtons.classList.add('div-projects-buttons');

  const githubEmailApi = document.createElement('a');
  githubEmailApi.setAttribute('href', 'https://github.com/raphss/email-API');
  githubEmailApi.setAttribute('target', '_blank');
  githubEmailApi.setAttribute('rel', 'noopener noreferrer');
  githubEmailApi.innerHTML = githubSVG;
  githubEmailApi.classList.add('icon');

  divEmailApiTextButtons.appendChild(githubEmailApi);

  divEmailApiText.appendChild(divEmailApiTextButtons);

  divEmailApi.appendChild(divEmailApiSlider);
  divEmailApi.appendChild(divEmailApiText);

  divCarouselItem1.appendChild(divRestaurant);
  divCarouselItem2.appendChild(divSyslink);
  divCarouselItem3.appendChild(divEmailApi);

  divCarouselInner.appendChild(divCarouselItem1);
  divCarouselInner.appendChild(divCarouselItem2);
  divCarouselInner.appendChild(divCarouselItem3);

  const buttonCarouselPrev = document.createElement('button');
  buttonCarouselPrev.classList.add('carousel-control-prev');
  buttonCarouselPrev.type = 'button';
  buttonCarouselPrev.setAttribute('data-bs-target', '#mainCarouselAuto');
  buttonCarouselPrev.setAttribute('data-bs-slide', 'prev');

  const spanCarouselPrev = document.createElement('span');
  spanCarouselPrev.classList.add('carousel-control-prev-icon');
  spanCarouselPrev.setAttribute('aria-hidden', 'true');

  const spanCarouselPrevText = document.createElement('span');
  spanCarouselPrevText.classList.add('visually-hidden');
  spanCarouselPrevText.textContent = 'Previous';

  buttonCarouselPrev.appendChild(spanCarouselPrev);
  buttonCarouselPrev.appendChild(spanCarouselPrevText);

  const buttonCarouselNext = document.createElement('button');
  buttonCarouselNext.classList.add('carousel-control-next');
  buttonCarouselNext.type = 'button';
  buttonCarouselNext.setAttribute('data-bs-target', '#mainCarouselAuto');
  buttonCarouselNext.setAttribute('data-bs-slide', 'next');

  const spanCarouselNext = document.createElement('span');
  spanCarouselNext.classList.add('carousel-control-next-icon');
  spanCarouselNext.setAttribute('aria-hidden', 'true');

  const spanCarouselNextText = document.createElement('span');
  spanCarouselNextText.classList.add('visually-hidden');
  spanCarouselNextText.textContent = 'Next';

  buttonCarouselNext.appendChild(spanCarouselNext);
  buttonCarouselNext.appendChild(spanCarouselNextText);

  divMainCarousel.appendChild(divCarouselInner);
  divMainCarousel.appendChild(buttonCarouselPrev);
  divMainCarousel.appendChild(buttonCarouselNext);

  projectsSection.appendChild(divMainCarousel);

  return projectsSection;
}

export default projects;
