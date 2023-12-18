import DeleteData from "../helpers/deleteData.js";
import PutData from "../helpers/putData.js";
import { USER } from "../helpers/url.js";

let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputPass = document.getElementById("password");
let btnEdit = document.getElementById("editar");
let btnGuardar = document.getElementById("guardar");
let btnEliminar = document.getElementById("eliminar");
let form = document.querySelector("form");

//!Obtiene la información de la sesión y cambia de json a objeto
let infoUser = JSON.parse(sessionStorage.getItem("infoUser"));

//!Mostrar datos en el perfil al cargar completamente la pagina desestructurando infoUser
document.addEventListener("DOMContentLoaded", () => {
  const { id, name, password, email } = infoUser;

  inputEmail.value = email;
  inputName.value = name;
  inputPass.value = password;

  btnEliminar.setAttribute("id", id);
});

//!Al hacer click en editar se habilita la opción de escribir en los inputs y muestra el
//!botón de guardar y oculta el de editar
btnEdit.addEventListener("click", () => {
  inputEmail.removeAttribute("disabled");
  inputName.removeAttribute("disabled");
  inputPass.removeAttribute("disabled");

  btnGuardar.classList.remove("d-none");
  btnEdit.classList.add("d-none");
});

//!Al dar submit extrae (desestructura) el id, actualiza objUser con los datos nuevos y llama la función putData
//!para actualizar objUser perteneciente al id extraído de la url
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { id } = infoUser;

  let objUser = {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPass.value,
  };

  await PutData(`${USER}/${id}`, objUser);
});

//!Eliminar usuario, resetear y mandar al login
btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  let id = e.target.id;

  DeleteData(`${USER}/${id}`).then(() => {
    form.reset();
    window.location.href = "/html/login.html";
    alert("Usuario Eliminado Correctamente")
  });
});
