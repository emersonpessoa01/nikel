// Cadastrar usuário
const myModal = new bootstrap.Modal(document.getElementById("transaction-modal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
  transactions: [],
};
const logout = document.getElementById("button-logout");

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
  getTransactions();

  alert("Lançamento adicionado com sucesso!");
});

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
  //   console.log(data);
  getTransactions();
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

// função para buscar toda a lista de transações
function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if (transactions.length) {
    transactions.forEach((item) => {
      let type = item.type === "2" ? "Saída" : "Entrada";

      // Formatação de data adicionando sufixo T00:00:00 para evitar inconsistências de timezone no deploy
      const date = new Date(item.date + "T00:00:00");
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      //   const formattedValue = Number(item.value)
      //     .toFixed(2)
      //     .replace(".", ",");

      // formatar valores monetários usando toLocaleString em pt-BR
      const formattedValue = Number(item.value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      transactionsHtml += `
        <tr>
            <th scope="row">${formattedDate}</th>
            <td>${formattedValue}</td>
            <td>${type}</td>
            <td>${item.description}</td>
        </tr>
      `;
    });

    document.getElementById("transaction-list").innerHTML = transactionsHtml;
  }
}
