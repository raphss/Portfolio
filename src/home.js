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

const linkedinSVG = `
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24"
>
  <path 
    fill="#ffffff"
    d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"
  />
</svg>
`;

const upworkSVG = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="12" fill="#ffffff" />
  <path
    fill="#111314"
    transform="translate(4.55 5.15) scale(0.65)"
    d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
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

function formatHeadline(headline) {
  const safe = escapeHtml(headline);

  return safe
    .replaceAll(/Full Stack/gi, '<strong>Full Stack</strong>')
    .replaceAll(/Web/gi, '<strong>Web</strong>')
    .replaceAll(/Desktop/gi, '<strong>Desktop</strong>')
    .replaceAll(/APIs?/gi, '<strong>API</strong>');
}

function home(content, t, locale) {
  const homeSection = document.createElement('section');
  homeSection.classList.add('section', 'home-section', 'hidden');

  const divProfile = document.createElement('div');
  divProfile.classList.add('div-profile');

  const divProfilePicture = document.createElement('div');
  divProfilePicture.classList.add('div-profile-picture', 'blur-load');

  if (content?.profilePicSmallPath) {
    divProfilePicture.style.backgroundImage = `url(${content.profilePicSmallPath})`;
  }

  const profilePicture = document.createElement('img');
  profilePicture.classList.add('profile-picture');

  if (content?.profilePicFullPath) {
    profilePicture.setAttribute('src', content.profilePicFullPath);
  }

  profilePicture.setAttribute('alt', 'Portrait of Raphael Vilete');
  profilePicture.setAttribute('width', '1200');
  profilePicture.setAttribute('height', '1200');
  profilePicture.setAttribute('loading', 'eager');
  profilePicture.setAttribute('fetchpriority', 'high');
  profilePicture.setAttribute('decoding', 'async');

  divProfilePicture.appendChild(profilePicture);

  const name = document.createElement('p');
  name.classList.add('profile-name');
  name.textContent = 'Raphael Vilete';

  const cvButton = document.createElement('button');
  cvButton.classList.add('btn', 'btn-dark', 'resume-button');

  cvButton.textContent = t.resumeButton;

  cvButton.addEventListener('click', () => {
    if (content?.resumePath) window.open(content.resumePath, '_blank');
  });

  const hireButton = document.createElement('a');
  hireButton.classList.add('btn', 'hire-button');
  hireButton.setAttribute('href', 'https://www.upwork.com/freelancers/~014661548058d3783a');
  hireButton.setAttribute('target', '_blank');
  hireButton.setAttribute('rel', 'noopener noreferrer');
  hireButton.setAttribute('aria-label', 'Open Upwork profile');
  hireButton.textContent = t.hireButton;

  divProfile.appendChild(divProfilePicture);
  divProfile.appendChild(name);
  divProfile.appendChild(hireButton);
  divProfile.appendChild(cvButton);

  const divAbout = document.createElement('div');
  divAbout.classList.add('div-about');

  const aboutParagraph = document.createElement('p');
  aboutParagraph.classList.add('about-paragraph');

  aboutParagraph.innerHTML = formatHeadline(content?.headline);

  const divSocials = document.createElement('div');
  divSocials.classList.add('div-socials');

  const githubIcon = document.createElement('a');
  githubIcon.setAttribute('href', 'https://github.com/raphss');
  githubIcon.setAttribute('target', '_blank');
  githubIcon.setAttribute('rel', 'noopener noreferrer');
  githubIcon.innerHTML = githubSVG;
  githubIcon.classList.add('icon');

  const linkedinIcon = document.createElement('a');

  const linkedinBaseUrl = 'https://www.linkedin.com/in/raphaelvilete/';

  linkedinIcon.setAttribute(
    'href',
    locale === 'pt' ? `${linkedinBaseUrl}?locale=pt_BR` : linkedinBaseUrl,
  );
  linkedinIcon.setAttribute('target', '_blank');
  linkedinIcon.setAttribute('rel', 'noopener noreferrer');
  linkedinIcon.innerHTML = linkedinSVG;
  linkedinIcon.classList.add('icon');

  const upworkIcon = document.createElement('a');
  upworkIcon.setAttribute('href', 'https://www.upwork.com/freelancers/~014661548058d3783a');
  upworkIcon.setAttribute('target', '_blank');
  upworkIcon.setAttribute('rel', 'noopener noreferrer');
  upworkIcon.setAttribute('aria-label', 'Upwork');
  upworkIcon.innerHTML = upworkSVG;
  upworkIcon.classList.add('icon', 'upwork-icon');

  divSocials.appendChild(githubIcon);
  divSocials.appendChild(linkedinIcon);
  divSocials.appendChild(upworkIcon);

  divAbout.appendChild(aboutParagraph);
  divAbout.appendChild(divSocials);

  homeSection.appendChild(divProfile);
  homeSection.appendChild(divAbout);

  return homeSection;
}

export default home;
