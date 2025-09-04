// Utilidades
const $ = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => [...el.querySelectorAll(sel)];

const alertBox = $('#alert');
function showAlert(msg, type='info'){
  alertBox.textContent = msg;
  alertBox.className = 'alert show';
  alertBox.style.background = type==='error' ? '#fdecea' : type==='success' ? '#e8fff3' : '#e8f4ff';
  alertBox.style.borderColor = type==='error' ? '#f5c0bd' : type==='success' ? '#b7f7cf' : '#b6dcff';
  alertBox.style.color = type==='error' ? '#611a15' : type==='success' ? '#0f5a2a' : '#0b508c';
  setTimeout(()=> alertBox.classList.remove('show'), 3500);
}

// Navegação
$$('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = btn.dataset.target;
    $$('.nav-btn').forEach(b=> b.classList.remove('active'));
    btn.classList.add('active');
    $$('.card').forEach(sec => sec.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
  });
});
// Ativa "Cadastro" por padrão
$('.nav-btn[data-target="cadastro"]').classList.add('active');

// Tema
const toggleTheme = $('#toggle-theme');
toggleTheme.addEventListener('click', ()=>{
  const isDark = document.body.classList.toggle('dark');
  toggleTheme.setAttribute('aria-pressed', String(isDark));
  toggleTheme.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
// Carrega tema salvo
if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark');
  toggleTheme.setAttribute('aria-pressed','true');
  toggleTheme.textContent = '☀️';
}

// Preferências de acessibilidade
$('#pref-contrast').addEventListener('change', (e)=>{
  document.body.classList.toggle('high-contrast', e.target.checked);
});
$('#pref-font').addEventListener('change', (e)=>{
  document.body.classList.toggle('big-font', e.target.checked);
});

// Força da senha
const senhaInput = $('#senha');
const passMeter = $('#pass-strength');
const passHint = $('#pass-hint');
senhaInput.addEventListener('input', ()=>{
  const v = senhaInput.value;
  let score = 0;
  if(v.length >= 6) score++;
  if(/[A-Z]/.test(v)) score++;
  if(/[0-9]/.test(v)) score++;
  if(/[^A-Za-z0-9]/.test(v)) score++;
  passMeter.value = score;
  const labels = ['Muito fraca','Fraca','Boa','Forte','Excelente'];
  passHint.textContent = `Força da senha: ${labels[score] || labels[0]}`;
});

// Toggle olho senha
function bindToggleEye(inputSel, btnSel){
  const input = $(inputSel);
  const btn = $(btnSel);
  btn.addEventListener('click', ()=>{
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
  });
}
bindToggleEye('#senha','#toggle-senha');
bindToggleEye('#confirma','#toggle-confirma');
bindToggleEye('#login-senha','#toggle-login');

// Validações helpers
function setError(id, msg){
  const el = document.getElementById(id);
  if(el){ el.textContent = msg || ''; }
}
function emailValido(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// CADASTRO
$('#form-cadastro').addEventListener('submit', (e)=>{
  e.preventDefault();
  let ok = true;

  const nome = $('#nome').value.trim();
  const email = $('#email').value.trim();
  const nascimento = $('#nascimento').value;
  const genero = $('#genero').value;
  const senha = $('#senha').value;
  const confirma = $('#confirma').value;
  const termos = $('#termos').checked;
  const telefone = $('#telefone').value.replace(/\D/g,'');
  const bio = $('#bio').value.trim();

  // limpa erros
  ['err-nome','err-email','err-nascimento','err-genero','err-senha','err-confirma','err-termos'].forEach(id=> setError(id,''));

  if(nome.length < 3){ setError('err-nome','Informe seu nome completo.'); ok=false; }
  if(!emailValido(email)){ setError('err-email','E-mail inválido.'); ok=false; }
  if(!nascimento){ setError('err-nascimento','Informe sua data de nascimento.'); ok=false; }
  if(!genero){ setError('err-genero','Selecione uma opção.'); ok=false; }
  if(senha.length < 6){ setError('err-senha','Mínimo de 6 caracteres.'); ok=false; }
  if(confirma !== senha){ setError('err-confirma','As senhas não coincidem.'); ok=false; }
  if(!termos){ setError('err-termos','Você precisa aceitar os termos.'); ok=false; }
  if(telefone && telefone.length < 10){ showAlert('Telefone opcional, mas se preencher use DDD + número.', 'info'); }

  if(!ok) { showAlert('Verifique os campos destacados.', 'error'); return; }

  // Simulação de 'backend' com localStorage
  const novo = {tipo:'cadastro', nome, email, nascimento, genero, bio, data:new Date().toISOString()};
  const arr = JSON.parse(localStorage.getItem('envios') || '[]');
  arr.push(novo);
  localStorage.setItem('envios', JSON.stringify(arr));
  renderDataList();

  e.target.reset();
  passMeter.value = 0;
  passHint.textContent = 'Força da senha';
  showAlert('Conta criada com sucesso!', 'success');
});

// LOGIN
$('#form-login').addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = $('#login-email').value.trim();
  const senha = $('#login-senha').value;
  setError('err-login-email','');
  setError('err-login-senha','');

  if(!emailValido(email)){ setError('err-login-email','E-mail inválido.'); return; }
  if(!senha){ setError('err-login-senha','Informe sua senha.'); return; }

  showAlert('Login efetuado (simulação).', 'success');
  e.target.reset();
});

// CONTATO
$('#form-contato').addEventListener('submit', (e)=>{
  e.preventDefault();
  const nome = $('#ct-nome').value.trim();
  const email = $('#ct-email').value.trim();
  const assunto = $('#assunto').value;
  const mensagem = $('#mensagem').value.trim();

  setError('err-ct-nome','');
  setError('err-ct-email','');
  setError('err-assunto','');
  setError('err-mensagem','');

  let ok = true;
  if(nome.length<2){ setError('err-ct-nome','Informe seu nome.'); ok=false; }
  if(!emailValido(email)){ setError('err-ct-email','E-mail inválido.'); ok=false; }
  if(!assunto){ setError('err-assunto','Selecione um assunto.'); ok=false; }
  if(mensagem.length<5){ setError('err-mensagem','Escreva sua mensagem.'); ok=false; }
  if(!ok){ showAlert('Corrija os campos do contato.', 'error'); return; }

  const novo = {tipo:'contato', nome, email, assunto, mensagem, data:new Date().toISOString()};
  const arr = JSON.parse(localStorage.getItem('envios') || '[]');
  arr.push(novo);
  localStorage.setItem('envios', JSON.stringify(arr));
  renderDataList();

  e.target.reset();
  showAlert('Mensagem enviada! (simulação)', 'success');
});

// NEWSLETTER
$('#form-news').addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = $('#news-email').value.trim();
  const termos = $('#news-termos').checked;
  setError('err-news-email','');
  setError('err-news-termos','');

  let ok = true;
  if(!emailValido(email)){ setError('err-news-email','E-mail inválido.'); ok=false; }
  if(!termos){ setError('err-news-termos','Você precisa aceitar.'); ok=false; }
  if(!ok){ showAlert('Verifique os dados para assinar.', 'error'); return; }

  const novo = {tipo:'newsletter', email, data:new Date().toISOString()};
  const arr = JSON.parse(localStorage.getItem('envios') || '[]');
  arr.push(novo);
  localStorage.setItem('envios', JSON.stringify(arr));
  renderDataList();

  e.target.reset();
  showAlert('Assinatura realizada! (simulação)', 'success');
});

// Lista de dados
function renderDataList(){
  const box = $('#lista-dados');
  const arr = JSON.parse(localStorage.getItem('envios') || '[]');
  if(arr.length === 0){ box.innerHTML = '<p class="hint">Nenhum envio ainda.</p>'; return; }
  box.innerHTML = arr.slice().reverse().map(item => {
    const dt = new Date(item.data).toLocaleString();
    const pre = JSON.stringify(item, null, 2)
      .replace(/\n/g,'<br>')
      .replace(/\s/g,'&nbsp;');
    return `<div class="data-item"><strong>${item.tipo.toUpperCase()}</strong> — <span>${dt}</span><br><code>${pre}</code></div>`;
  }).join('');
}
renderDataList();

// Botão limpar
$('#btn-limpar-dados').addEventListener('click', ()=>{
  localStorage.removeItem('envios');
  renderDataList();
  showAlert('Envios apagados.', 'success');
});

// Ano no rodapé
$('#ano').textContent = new Date().getFullYear();
