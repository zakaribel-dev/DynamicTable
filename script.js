window.addEventListener("load", () => {
  let form = document.getElementById("form-id");

  let table = document.getElementById("table-id");

  table.style.visibility = "hidden";

  form.addEventListener("submit", generate);

  table.addEventListener("click", buttonTableClick);
});

let id = 0;

let message = document.getElementById("msg");

function generate(event) {
  event.preventDefault();
  let lastname = document.getElementById("lastname-id").value;
  let firstname = document.getElementById("firstname-id").value;
  let table = document.getElementById("table-id");
  let form = document.getElementById("form-id");
  table.style.visibility = "visible";

  if (lastname.length === 0 || firstname.length === 0) {
    alert("Merci de renseigner les champs demandés");
    let rowCount = table.querySelectorAll("tr").length;
    if (rowCount > 1) {
      table.style.visibility = "visible";
    } else {
      table.style.visibility = "hidden";
    }
  } else {
    let td_firstname = document.createElement("td");
    td_firstname.textContent = firstname;
    let td_lastname = document.createElement("td");
    td_lastname.textContent = lastname;

    let editBtn = document.createElement("td");
    editBtn.innerHTML =
      "<button class='edit-btn'>Editer</button><button class='delete-btn' >Supprimer</button>";

    let tr = document.createElement("tr");
    tr.setAttribute("id", ++id);
    td_firstname.setAttribute("id", id);
    td_lastname.setAttribute("id", id);
    td_firstname.setAttribute("class", "firstname");
    td_lastname.setAttribute("class", "lastname");

    tr.appendChild(td_firstname);
    tr.appendChild(td_lastname);
    tr.appendChild(editBtn);

    table.appendChild(tr);

    form.reset();
  }
}

function displayMsg(deleteRow, editRow, nonEdit) {
  message.style.visibility = "visible";

  if (deleteRow) {
    message.innerHTML =
      "<div class='alert alert-danger' role='alert' style=font-weight:bolder;>Ligne supprimée</div>";
  } else if (editRow) {
    message.innerHTML =
      "<div class='alert alert-primary' role='alert'style=font-weight:bolder;>Ligne modifiée</div>";
  } else if (nonEdit) {
    message.innerHTML =
      "<div class='alert alert-primary' role='alert'style=font-weight:bolder;>Ligne non modifiée</div>";
  }

  setTimeout(function () {
    message.style.visibility = "hidden";
  }, 1500);

  setTimeout(function () {
    message.classList.add("fade-out");
  }, 1000);

  setTimeout(function () {
    message.style.visibility = "hidden";
    message.classList.remove("fade-out");
  }, 1500);
}

function buttonTableClick(event) {
  let target = event.target;
  // DELETE

  if (target.classList.contains("delete-btn")) {
    let row = target.closest("tr");

    row.classList.add("fade-out");

    setTimeout(function () {
      row.remove();

      if (document.querySelectorAll("td").length === 0) {
        let table = document.getElementById("table-id");
        table.style.visibility = "hidden";
      }
    }, 370);

    let message = document.getElementById("msg");
    message.style.visibility = "visible";

    displayMsg(true, false, false);
  }

  // EDIT

  if (target.classList.contains("edit-btn")) {
    let cell = target.closest("td");
    let row = cell.parentNode;
    let newFirstName = prompt("Modifier le Prénom : ");
    let newLastName = prompt("Modifier le Nom : ");
    message.style.visibility = "visible";

    row.classList.add("clignoter");

    if (newFirstName && newLastName) {
      let firstNameCell = row.querySelector(".firstname");
      let lastNameCell = row.querySelector(".lastname");

      firstNameCell.textContent = newFirstName;
      lastNameCell.textContent = newLastName;

      displayMsg(false, true, false);

      setTimeout(function () {
        row.classList.remove("clignoter");
      }, 1200);
    } else {
      displayMsg(false, false, true);
    }
  }
}
