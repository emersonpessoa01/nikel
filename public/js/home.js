// Cadastrar usuário
const myModal = new bootstrap.Modal(document.getElementById("transaction-modal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
  transactions: [],
};

const logout = document.getElementById("button-logout");

checkLogged();

// Verificar se está logado, caso não esteja, redirecionar para index.html

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }
  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  //Capturar dados do usuário
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
      data = JSON.parse(dataUser);
    }
    console.log(data);
}

//Logout do usuário
logout.addEventListener("click", function () {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");
  window.location.href = "index.html";
});
