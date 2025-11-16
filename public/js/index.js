const myModal = new bootstrap.Modal(document.getElementById("register-modal"));

document.getElementById("create-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length <= 5) {
    alert("Preencha um email válido");
    return;
  }
  if (password.length < 4) {
    alert("A senha deve ter no mínimo 4 caracteres");
    return;
  }
  saveAccount({
    login: email,
    password: password,
    transacions: [],
  });
  myModal.hide();

  alert(`Conta criada com sucesso!\nEmail: ${email}`);
});

function saveAccount(data) {
  //   console.log(data);
  //  salvar os dados no localStorage
  localStorage.setItem(data.login, JSON.stringify(data));
}
