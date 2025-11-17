// Cadastrar usuário
const myModal = new bootstrap.Modal(document.getElementById("transaction-modal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
  transactions: [],
};


const logout = document.getElementById("button-logout");

checkLogged();

// Funçao Adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  

  //  adicionar lançamento
  data.transactions.unshift({
    value: value,
    type: type,
    description: description,
    date: date,
  });

    saveData(data);
    event.target.reset();
    myModal.hide();

    alert("Lançamento adicionado com sucesso!");
});

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

// Função salvar dados no localStorage
function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}