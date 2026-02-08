// Obtener el formulario y todos los campos
const form = document.querySelector(".formulario");
const nameInput = document.getElementById("name");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const queryTypeInputs = document.querySelectorAll('input[name="q_type"]');
const mensajeInput = document.getElementById("mensaje");
const checkboxInput = document.getElementById("autorizo");

// Obtener mensajes de error
const nameError = document.getElementById("name-error");
const apellidoError = document.getElementById("apellido-error");
const emailError = document.getElementById("email-error");
const queryError = document.getElementById("query-error");
const mensajeError = document.getElementById("mensaje-error");
const checkboxError = document.getElementById("checkbox-error");

// Obtener contenedor de radio buttons y checkbox custom
const consulContainer = document.querySelector(".consul");
const checkboxCustom = document.querySelector(".checkbox-custom");

// Obtener notificación de éxito
const successNotification = document.getElementById("successNotification");

// Función para mostrar notificación de éxito
function showSuccessNotification() {
  successNotification.classList.add("show");
  
  // Ocultar después de 5 segundos
  setTimeout(() => {
    successNotification.classList.remove("show");
  }, 5000);
}

// Función para limpiar el formulario
function resetForm() {
  form.reset();
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para mostrar error
function showError(input, errorElement, errorClass = "") {
  input.classList.add("error");
  errorElement.classList.add("show");
  if (errorClass && errorClass === "consul") {
    consulContainer.classList.add("error");
  }
  if (errorClass && errorClass === "checkbox") {
    checkboxCustom.classList.add("error");
  }
}

// Función para ocultar error
function hideError(input, errorElement, errorClass = "") {
  input.classList.remove("error");
  errorElement.classList.remove("show");
  if (errorClass && errorClass === "consul") {
    consulContainer.classList.remove("error");
  }
  if (errorClass && errorClass === "checkbox") {
    checkboxCustom.classList.remove("error");
  }
}

// Validar nombre
nameInput.addEventListener("blur", function () {
  if (this.value.trim() === "") {
    showError(this, nameError);
  } else {
    hideError(this, nameError);
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    hideError(this, nameError);
  }
});

// Validar apellido
apellidoInput.addEventListener("blur", function () {
  if (this.value.trim() === "") {
    showError(this, apellidoError);
  } else {
    hideError(this, apellidoError);
  }
});

apellidoInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    hideError(this, apellidoError);
  }
});

// Validar email
emailInput.addEventListener("blur", function () {
  if (this.value.trim() === "" || !isValidEmail(this.value)) {
    showError(this, emailError);
  } else {
    hideError(this, emailError);
  }
});

emailInput.addEventListener("input", function () {
  if (this.value.trim() !== "" && isValidEmail(this.value)) {
    hideError(this, emailError);
  }
});

// Validar radio buttons
queryTypeInputs.forEach((radio) => {
  radio.addEventListener("change", function () {
    hideError(radio, queryError, "consul");
  });
});

// Validar mensaje
mensajeInput.addEventListener("blur", function () {
  if (this.value.trim() === "") {
    showError(this, mensajeError);
  } else {
    hideError(this, mensajeError);
  }
});

mensajeInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    hideError(this, mensajeError);
  }
});

// Validar checkbox
checkboxInput.addEventListener("change", function () {
  if (!this.checked) {
    showError(this, checkboxError, "checkbox");
  } else {
    hideError(this, checkboxError, "checkbox");
  }
});

// Validar formulario al enviar
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Validar nombre
  if (nameInput.value.trim() === "") {
    showError(nameInput, nameError);
    isValid = false;
  }

  // Validar apellido
  if (apellidoInput.value.trim() === "") {
    showError(apellidoInput, apellidoError);
    isValid = false;
  }

  // Validar email
  if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
    showError(emailInput, emailError);
    isValid = false;
  }

  // Validar query type
  const queryTypeSelected = Array.from(queryTypeInputs).some(
    (radio) => radio.checked,
  );
  if (!queryTypeSelected) {
    showError(queryTypeInputs[0], queryError, "consul");
    isValid = false;
  }

  // Validar mensaje
  if (mensajeInput.value.trim() === "") {
    showError(mensajeInput, mensajeError);
    isValid = false;
  }

  // Validar checkbox
  if (!checkboxInput.checked) {
    showError(checkboxInput, checkboxError, "checkbox");
    isValid = false;
  }

  // Si todo es válido, enviar el formulario
  if (isValid) {
    // Crear FormData para enviar con AJAX
    const formData = new FormData(form);
    
    // Enviar con fetch
    fetch('guardar.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      // Mostrar notificación de éxito
      showSuccessNotification();
      
      // Limpiar el formulario
      resetForm();
      
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
    });
  }
});