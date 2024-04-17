function contact() {
  const contactSection = document.createElement('section');
  contactSection.classList.add('section', 'contact-section', 'hidden');

  const contactDiv = document.createElement('div');
  contactDiv.classList.add('contact-div');

  const contactHeaderP = document.createElement('p');
  contactHeaderP.innerHTML =
    'Para encontrar mais projetos ou para entrar em contato, visite minhas redes sociais ' +
    '(<a href="#">topo da página</a>) ou envie um email através dos campos abaixo.';

  const contactForm = document.createElement('form');
  contactForm.action = 'https://api.web3forms.com/submit';
  contactForm.method = 'POST';
  contactForm.classList.add('contact-form');

  const hiddenField = document.createElement('input');
  hiddenField.type = 'hidden';
  hiddenField.name = 'access_key';
  hiddenField.value = '5c2b809e-64d2-49bd-991e-090f5e97c527';

  const nameField = document.createElement('input');
  nameField.type = 'text';
  nameField.name = 'name';
  nameField.placeholder = 'Nome';
  nameField.required = true;

  const emailField = document.createElement('input');
  emailField.type = 'email';
  emailField.name = 'email';
  emailField.placeholder = 'Email';
  emailField.required = true;

  const messageField = document.createElement('textarea');
  messageField.name = 'message';
  messageField.placeholder = 'Mensagem';
  messageField.required = true;

  const submitButton = document.createElement('button');
  submitButton.classList.add('btn', 'btn-dark');
  submitButton.type = 'submit';
  submitButton.textContent = 'Enviar Email';

  contactForm.appendChild(hiddenField);
  contactForm.appendChild(nameField);
  contactForm.appendChild(emailField);
  contactForm.appendChild(messageField);
  contactForm.appendChild(submitButton);

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(contactForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Formulário enviado com sucesso!');
          contactForm.reset();
        } else {
          alert('Erro ao enviar o formulário. Por favor, tente novamente.');
        }
      })
      .catch((error) => {
        alert('Erro ao enviar o formulário. Por favor, tente novamente.');
      });
  });

  contactDiv.appendChild(contactHeaderP);
  contactDiv.appendChild(contactForm);

  contactSection.appendChild(contactDiv);

  return contactSection;
}

export default contact;
