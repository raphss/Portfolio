const footerDiv = document.createElement('div');
footerDiv.classList.add('footer');

const copy = document.createElement('p');
copy.innerHTML = `Copyright &copy; ${new Date().getFullYear()} Raphael Vilete`;

footerDiv.appendChild(copy);

function footer() {
  return footerDiv;
}

export default footer;
