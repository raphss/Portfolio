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

function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const preloadedImageUrls = new Map();

function preloadImage(src, fetchPriority = 'low') {
  if (!src) return Promise.resolve(false);
  if (preloadedImageUrls.has(src)) return preloadedImageUrls.get(src);

  const promise = new Promise((resolve) => {
    const image = new Image();
    let finished = false;

    const finish = (loaded) => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      if (!loaded) preloadedImageUrls.delete(src);
      resolve(loaded);
    };

    const timeout = window.setTimeout(() => finish(false), 5000);
    image.decoding = 'async';
    image.fetchPriority = fetchPriority;
    image.addEventListener('load', () => finish(true), { once: true });
    image.addEventListener('error', () => finish(false), { once: true });
    image.src = src;

    if (image.complete) {
      window.setTimeout(() => finish(image.naturalWidth > 0), 0);
    }
  });

  preloadedImageUrls.set(src, promise);
  return promise;
}

function preloadImagesWhenIdle(urls) {
  const queue = [...new Set(urls.filter(Boolean))];

  const preloadQueue = async () => {
    for (const src of queue) {
      // Preload one image at a time so background work does not compete with
      // the content currently visible to the visitor.
      // eslint-disable-next-line no-await-in-loop
      await preloadImage(src);
    }
  };

  const schedule = () => {
    preloadQueue();
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(schedule, { timeout: 1000 });
  } else {
    window.setTimeout(schedule, 300);
  }
}

function createSliderButton(direction, label) {
  const button = document.createElement('button');
  button.classList.add('slider-button', `slider-button-${direction}`);
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.innerHTML =
    direction === 'previous'
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg>';

  return button;
}

function createProjectDiv(images) {
  const div = document.createElement('div');
  div.classList.add('project-div');

  let imgIndex = 0;
  let imageRequest = 0;

  const divImage = document.createElement('div');
  divImage.classList.add('div-image');
  divImage.setAttribute('aria-busy', 'true');

  const imgElement = document.createElement('img');
  imgElement.alt = '';
  imgElement.loading = 'lazy';
  imgElement.decoding = 'async';

  const loadingIndicator = document.createElement('span');
  loadingIndicator.classList.add('image-loader');
  loadingIndicator.setAttribute('aria-label', 'Loading image');

  const setLoading = (loading) => {
    divImage.classList.toggle('is-loading', loading);
    divImage.setAttribute('aria-busy', String(loading));
  };

  imgElement.addEventListener('load', () => {
    imgElement.classList.add('is-visible');
    setLoading(false);
  });

  imgElement.addEventListener('error', () => {
    setLoading(false);
  });

  divImage.appendChild(imgElement);
  divImage.appendChild(loadingIndicator);

  if (images[imgIndex]) {
    imgElement.src = images[imgIndex];
  } else {
    setLoading(false);
  }

  const showImage = async (nextIndex) => {
    if (images.length <= 1) return;

    imgIndex = nextIndex;
    const src = images[imgIndex];
    const requestId = ++imageRequest;

    setLoading(true);
    const loaded = await preloadImage(src, 'high');
    if (requestId !== imageRequest) return;

    if (!loaded) {
      setLoading(false);
      return;
    }

    imgElement.classList.remove('is-visible');

    window.setTimeout(() => {
      if (requestId !== imageRequest) return;

      imgElement.src = src;
      window.requestAnimationFrame(() => {
        if (requestId !== imageRequest) return;

        imgElement.classList.add('is-visible');
        setLoading(false);
      });
    }, 160);

    preloadImage(images[(imgIndex + 1) % images.length]);
  };

  const divBtns = document.createElement('div');
  divBtns.classList.add('slider-buttons');

  const prevButton = createSliderButton('previous', 'Previous image');
  prevButton.disabled = images.length <= 1;
  prevButton.addEventListener('click', () => {
    showImage((imgIndex - 1 + images.length) % images.length);
  });
  prevButton.addEventListener('pointerenter', () => {
    if (images.length > 1) {
      preloadImage(images[(imgIndex - 1 + images.length) % images.length]);
    }
  });
  prevButton.addEventListener('focus', () => {
    if (images.length > 1) {
      preloadImage(images[(imgIndex - 1 + images.length) % images.length]);
    }
  });
  divBtns.appendChild(prevButton);

  const nextButton = createSliderButton('next', 'Next image');
  nextButton.disabled = images.length <= 1;
  nextButton.addEventListener('click', () => {
    showImage((imgIndex + 1) % images.length);
  });
  nextButton.addEventListener('pointerenter', () => {
    if (images.length > 1) {
      preloadImage(images[(imgIndex + 1) % images.length]);
    }
  });
  nextButton.addEventListener('focus', () => {
    if (images.length > 1) {
      preloadImage(images[(imgIndex + 1) % images.length]);
    }
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
  h3Project.textContent = projectName || '';

  const pProject = document.createElement('p');
  pProject.innerHTML = escapeHtml(projectDescription);

  divProjectText.appendChild(h3Project);
  divProjectText.appendChild(pProject);

  return divProjectText;
}

function createProjectButtons(links) {
  const divButtons = document.createElement('div');
  divButtons.classList.add('div-projects-buttons');

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (!link?.url) continue;

    if (link.kind === 'github') {
      const githubLink = document.createElement('a');
      githubLink.setAttribute('href', link.url);
      githubLink.setAttribute('target', '_blank');
      githubLink.setAttribute('rel', 'noopener noreferrer');
      githubLink.innerHTML = githubSVG;
      githubLink.classList.add('icon');
      divButtons.appendChild(githubLink);
      continue;
    }

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-dark');
    button.textContent = link.label || 'Open';
    button.addEventListener('click', () => {
      window.open(link.url, '_blank');
    });
    divButtons.appendChild(button);
  }

  return divButtons;
}

function projects(projectsData) {
  const projectsSection = document.createElement('section');
  projectsSection.classList.add('section', 'proj-section', 'hidden');

  const list = Array.isArray(projectsData?.projects)
    ? projectsData.projects
    : [];

  if (!list.length) {
    return projectsSection;
  }

  const divMainCarousel = document.createElement('div');
  divMainCarousel.classList.add(
    'carousel',
    'slide',
    'w-100',
    'div-main-carousel',
  );
  divMainCarousel.id = 'mainCarouselAuto';
  divMainCarousel.setAttribute('data-bs-ride', 'carousel');

  const divCarouselInner = document.createElement('div');
  divCarouselInner.classList.add('carousel-inner');

  for (let i = 0; i < list.length; i++) {
    const p = list[i];

    const divCarouselItem = document.createElement('div');
    divCarouselItem.classList.add('carousel-item');
    if (i === 0) divCarouselItem.classList.add('active');

    const divSlider = document.createElement('div');
    divSlider.classList.add('div-slider');

    const images = (p.images || []).map((img) => img.imagePath).filter(Boolean);
    const divProjectSlider = createProjectDiv(images);

    const divProjectText = createProjectText(p.title, p.description);
    const divButtons = createProjectButtons(p.links || []);
    divProjectText.appendChild(divButtons);

    divSlider.appendChild(divProjectSlider);
    divSlider.appendChild(divProjectText);

    divCarouselItem.appendChild(divSlider);
    divCarouselInner.appendChild(divCarouselItem);
  }

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

  const getActiveProjectIndex = () =>
    Array.from(divCarouselInner.children).findIndex((item) =>
      item.classList.contains('active'),
    );

  const preloadAdjacentProject = (offset) => {
    const activeIndex = getActiveProjectIndex();
    const targetIndex = (activeIndex + offset + list.length) % list.length;
    const targetImage = list[targetIndex]?.images?.[0]?.imagePath;
    preloadImage(targetImage);
  };

  buttonCarouselPrev.addEventListener('pointerenter', () => {
    preloadAdjacentProject(-1);
  });
  buttonCarouselPrev.addEventListener('focus', () => {
    preloadAdjacentProject(-1);
  });
  buttonCarouselNext.addEventListener('pointerenter', () => {
    preloadAdjacentProject(1);
  });
  buttonCarouselNext.addEventListener('focus', () => {
    preloadAdjacentProject(1);
  });

  divMainCarousel.appendChild(divCarouselInner);
  divMainCarousel.appendChild(buttonCarouselPrev);
  divMainCarousel.appendChild(buttonCarouselNext);

  projectsSection.appendChild(divMainCarousel);

  preloadImagesWhenIdle(
    list.flatMap((project) =>
      (project.images || []).map((image) => image.imagePath),
    ),
  );

  return projectsSection;
}

export default projects;
