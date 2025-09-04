           /* entrada.html*/

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  // Aqui você pode colocar integração com backend
  alert(`Login realizado com sucesso!\nEmail: ${email}`);
});


        /* cadastro.html*/
    // script.js
document.addEventListener("DOMContentLoaded", () => {
  const btnSignup = document.querySelector(".btn-signup");
  const formCadastro = document.querySelector(".form-card");

  // inicialmente esconde o formulário
  formCadastro.style.display = "none";

  // quando clicar em "Inscrever-se", mostra/esconde o formulário
  btnSignup.addEventListener("click", (e) => {
    e.preventDefault(); // evita recarregar a página
    if (formCadastro.style.display === "none") {
      formCadastro.style.display = "block";
    } else {
      formCadastro.style.display = "none";
    }
  });

  // validação do formulário
  const form = document.getElementById("cadastroForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const perfil = document.getElementById("perfil").value;

    if (!nome || !email || !senha || !perfil) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    alert("✅ Cadastro realizado com sucesso!");
    form.reset();
    formCadastro.style.display = "none"; // esconde após cadastrar
  });
});
        /* animação do olho-senha */
/* animação do olho-senha */
function mostrarSenha() {
  var inputPass = document.getElementById('senha');
  var btnShowPass = document.getElementById('btn-senha');

  if (inputPass.type === 'password') {
    inputPass.setAttribute('type', 'text');
    btnShowPass.classList.replace('bi-eye', 'bi-eye-slash');
  } else {
    inputPass.setAttribute('type', 'password');
    btnShowPass.classList.replace('bi-eye-slash', 'bi-eye');
  }
}



        

         
