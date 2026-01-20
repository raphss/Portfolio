function contact(t, locale) {
  const contactSection = document.createElement('section');
  contactSection.classList.add('section', 'contact-section', 'hidden');

  const contactDiv = document.createElement('div');
  contactDiv.classList.add('contact-div');

  const contactHeaderP = document.createElement('p');
  contactHeaderP.innerHTML =
    `${t.contact.textBeforeLink}` +
    `(<a href="#">${t.contact.topLinkLabel}</a>)` +
    `${t.contact.textAfterLink}`;

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
  nameField.placeholder = t.contact.namePlaceholder;
  nameField.required = true;

  const emailField = document.createElement('input');
  emailField.type = 'email';
  emailField.name = 'email';
  emailField.placeholder = t.contact.emailPlaceholder;
  emailField.required = true;

  const messageField = document.createElement('textarea');
  messageField.name = 'message';
  messageField.placeholder = t.contact.messagePlaceholder;
  messageField.required = true;

  const submitButton = document.createElement('button');
  submitButton.classList.add('btn', 'btn-dark');
  submitButton.type = 'submit';
  submitButton.textContent = t.contact.submitButton;

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
          alert(
            locale === 'pt'
              ? 'Formulário enviado com sucesso!'
              : 'Form submitted successfully!',
          );
          contactForm.reset();
        } else {
          alert(
            locale === 'pt'
              ? 'Erro ao enviar o formulário. Por favor, tente novamente.'
              : 'Error submitting the form. Please try again.',
          );
        }
      })
      .catch(() => {
        alert(
          locale === 'pt'
            ? 'Erro ao enviar o formulário. Por favor, tente novamente.'
            : 'Error submitting the form. Please try again.',
        );
      });
  });

  contactDiv.appendChild(contactHeaderP);
  contactDiv.appendChild(contactForm);

  contactSection.appendChild(contactDiv);

  return contactSection;
}

export default contact;
