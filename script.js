// Header aparece após rolar 150px
window.addEventListener('scroll', () => {
  const titulo = document.getElementById('header-title');
  const subtitulo = document.getElementById('header-subtitle');

  if (window.scrollY > 150) {
    titulo.classList.add('show-header-text');
    subtitulo.classList.add('show-header-text');
  } else {
    titulo.classList.remove('show-header-text');
    subtitulo.classList.remove('show-header-text');
  }
});

// Menu: scroll suave + ativar item ativo conforme scroll
const links = document.querySelectorAll('nav ul li a');
const sections = [...document.querySelectorAll('section.planeta')];

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    setActiveLink(link);
  });
});

function setActiveLink(activeLink) {
  links.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
}

// Mudar ativo conforme scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight / 3;

  for (const section of sections) {
    if (scrollPos >= section.offsetTop) {
      const id = '#' + section.id;
      const link = document.querySelector(`nav ul li a[href="${id}"]`);
      setActiveLink(link);
    }
  }
});

// Modal info dos planetas
const planetsInfo = {
  Mercúrio: "Mercúrio é o planeta mais próximo do Sol e o menor do sistema solar.",
  Vênus: "Vênus é o planeta mais quente, com uma atmosfera densa e cheia de gases tóxicos.",
  Terra: "Terra é o único planeta conhecido que abriga vida, com uma atmosfera rica em oxigênio.",
  Marte: "Marte é conhecido como o planeta vermelho, com grandes vulcões e vales profundos.",
  Júpiter: "Júpiter é o maior planeta do sistema solar, um gigante gasoso com uma Grande Mancha Vermelha.",
  Saturno: "Saturno é famoso pelos seus anéis compostos por gelo e rochas.",
  Urano: "Urano tem uma cor azul-esverdeada e gira de lado em relação ao seu eixo.",
  Netuno: "Netuno é o planeta mais distante do Sol, famoso pelos ventos extremamente fortes."
};

const planetas = document.querySelectorAll('.planeta');

planetas.forEach(planeta => {
  planeta.addEventListener('click', () => {
    const nome = planeta.querySelector('h2').textContent;
    showModal(nome, planetsInfo[nome]);
  });
});

function showModal(title, message) {
  let modal = document.querySelector('.modal-container');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.classList.add('modal-container');
  modal.innerHTML = `
    <div class="modal">
      <h2>${title}</h2>
      <p>${message}</p>
      <button id="close-modal">Fechar</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('close-modal').addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}
