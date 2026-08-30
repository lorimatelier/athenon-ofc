// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 16);
});

// Mobile menu
const menuBtn = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  reveals.forEach(r => r.classList.add('in'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(r => observer.observe(r));
}

// FAQ
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Cases modals
const cases = {
  case1: {
    metric: '80%', label: 'redução no tempo de produção',
    title: 'Empresa de educação online · Médio porte', sub: 'Criação de aulas · Athenon Mecanismo + Direção',
    content: [
      { p: 'Você conhece esse gargalo. É aquele que começa com "isso é impossível de automatizar aqui".' },
      { p: 'Cada aula nova era um projeto com público diferente, tema diferente, professor diferente, tempos diferentes. De 10 a 20 horas de trabalho para uma aula de 1h30.' },
      { p: 'Não era preguiça. Não era desorganização. Era um processo desenhado e documentado que parecia personalizado demais pra automatizar.' },
      { h: 'O que a Athenon encontrou' },
      { p: 'Antes de propor qualquer solução, mapeamos o processo inteiro. A pergunta que guiou tudo foi simples: o que aqui só existe porque sempre foi assim?' },
      { p: 'A resposta revelou um processo cheio de retrabalho evitável e um professor que passava mais tempo sendo entrevistado e corrigido do que criando.' },
      { h: 'O que foi construído' },
      { p: 'Redesenhamos o fluxo do zero. O professor passou a ser atendido por um agente treinado no método da empresa: ele conduz a entrevista, organiza o raciocínio e já entrega o roteiro estruturado. Os slides são gerados automaticamente.' },
      { h: 'O resultado' },
      { p: 'De 10–20 horas para 2–3 horas por aula. A equipe parou de produzir para passar a revisar. O professor parou de ser gargalo pra voltar a ser especialista — e o índice de satisfação aumentou.' },
    ]
  },
  case2: {
    metric: '10x', label: 'mais entregas no mesmo período',
    title: 'Criador de conteúdo independente', sub: 'Agente de IA + roteiro · Athenon Inteligência',
    content: [
      { p: 'Especialista reconhecido na sua área, com seguidores, com credibilidade — mas completamente sozinho na operação. Cada post era uma decisão do zero.' },
      { p: 'A ideia de conteúdo existia. O talento existia. O que faltava era um sistema.' },
      { h: 'O que a Athenon encontrou' },
      { p: 'A conclusão foi simples e incômoda: o problema não era falta de conteúdo. Era que tudo dependia do humor, do tempo e da energia dele naquele dia.' },
      { h: 'O que foi construído' },
      { p: 'Com o posicionamento definido e a identidade visual estruturada, criamos um agente treinado na linguagem e no estilo da marca dele. Hoje ele decide o que quer comunicar — o agente cuida do resto: triagem, pesquisa e estruturação inicial.' },
      { h: 'O resultado' },
      { p: 'De poucas entregas por semana pra 10x mais no mesmo período. Ele voltou a fazer o que só ele pode fazer. A operação, essa a gente resolveu.' },
    ]
  },
  case3: {
    metric: '95%', label: 'redução no tempo operacional',
    title: 'Empresa moveleira · Grande porte', sub: 'Controle de faltas e estoque · Athenon Mecanismo',
    content: [
      { p: 'Todo dia, alguém da equipe administrativa abria o sistema, extraía os dados, colava numa planilha, conferia linha por linha. Duas horas. Todo dia. Sem falta.' },
      { p: 'O jeito que sempre funcionou estava consumindo tempo, gerando erro e dependendo de uma única pessoa que sabia exatamente como fazer.' },
      { h: 'O que a Athenon encontrou' },
      { p: 'Os dados já existiam no sistema. O problema era o que acontecia depois que eles saíam dele.' },
      { h: 'O que foi construído' },
      { p: 'Nenhum software novo. Nenhuma integração complexa. Uma planilha estruturada que lê, organiza e consolida automaticamente o que antes era feito à mão.' },
      { h: 'O resultado' },
      { p: 'De 2 horas para 5 minutos por dia. Zero retrabalho. Zero dependência de uma pessoa só. Sem gastar um real a mais em tecnologia.' },
    ]
  }
};

function openModal(id) {
  const c = cases[id];
  let html = `<p class="modal-eyebrow">Caso · ${c.metric} ${c.label}</p>
    <h3 class="modal-title">${c.title}</h3>
    <p class="modal-sub">${c.sub}</p>
    <div class="modal-body">`;
  c.content.forEach(b => {
    if (b.h) html += `<h4>${b.h}</h4>`;
    else html += `<p>${b.p}</p>`;
  });
  html += '</div>';
  document.getElementById('modal-body-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalDirect(); });
