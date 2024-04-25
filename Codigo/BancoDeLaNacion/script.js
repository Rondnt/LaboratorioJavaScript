document.addEventListener("DOMContentLoaded", function() {
  var selectTipo = document.getElementById("selectTipo");
  var numeroTarjetaInput = document.getElementById("txtNumeroTarjeta");
  var tipoDocumentoSelect = document.getElementById("selectTipoDocumento");
  var numeroDocumentoInput = document.getElementById("txtNumeroDocumento");
  var numerosTeclado = document.querySelectorAll(".numero");
  var txtClaveInternet = document.getElementById("txtClaveInternet");

  // Función para permitir solo números en los campos de entrada
  function permitirSoloNumeros(input) {
    input.addEventListener("keypress", function(event) {
      var charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    });
  }

  permitirSoloNumeros(numeroTarjetaInput);
  permitirSoloNumeros(numeroDocumentoInput);

  selectTipo.addEventListener("change", function() {
    var selectedOption = selectTipo.options[selectTipo.selectedIndex].value;
    var tipoDocumentoGroup = document.getElementById("tipoDocumentoGroup");

    if (selectedOption === "multired_global" || selectedOption === "dni") {
      tipoDocumentoGroup.style.display = "block";
    } else {
      tipoDocumentoGroup.style.display = "none";
    }
  });

  var btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.addEventListener("click", function() {
    var tipoSeleccionado = selectTipo.options[selectTipo.selectedIndex].value;
    var numeroTarjeta = numeroTarjetaInput.value;
    var tipoDocumentoSeleccionado = tipoDocumentoSelect.options[tipoDocumentoSelect.selectedIndex].value;
    var numeroDocumento = numeroDocumentoInput.value;

    // Validar longitud de los campos
    var errores = [];
    if (tipoSeleccionado === "multired_global") {
      if (numeroTarjeta.length !== 16) {
        errores.push("El número de tarjeta debe contener 16 dígitos.");
      }
      if (tipoDocumentoSeleccionado === "DNI" && numeroDocumento.length !== 8) {
        errores.push("El número de DNI debe contener 8 dígitos.");
      } else if (tipoDocumentoSeleccionado === "RUC" && numeroDocumento.length !== 11) {
        errores.push("El número de RUC debe contener 11 dígitos.");
      }
    } else if (tipoSeleccionado === "dni" && tipoDocumentoSeleccionado === "DNI" && numeroDocumento.length !== 8) {
      errores.push("El número de DNI debe contener 8 dígitos.");
    } else if (tipoSeleccionado === "ruc" && tipoDocumentoSeleccionado === "RUC" && numeroDocumento.length !== 11) {
      errores.push("El número de RUC debe contener 11 dígitos.");
    }

    if (errores.length > 0) {
      alert(errores.join("\n"));
    } else {
      
      console.log("Tipo seleccionado:", tipoSeleccionado);
      console.log("Número de tarjeta:", numeroTarjeta);
      console.log("Tipo de documento seleccionado:", tipoDocumentoSeleccionado);
      console.log("Número de documento:", numeroDocumento);
    }
  });

  // Limitar la longitud del número de documento para DNI y RUC
  tipoDocumentoSelect.addEventListener("change", function() {
    var tipoDocumentoSeleccionado = tipoDocumentoSelect.options[tipoDocumentoSelect.selectedIndex].value;
    if (tipoDocumentoSeleccionado === "DNI") {
      numeroDocumentoInput.setAttribute("maxlength", "8");
    } else if (tipoDocumentoSeleccionado === "RUC") {
      numeroDocumentoInput.setAttribute("maxlength", "11");
    } else {
      numeroDocumentoInput.removeAttribute("maxlength");
    }
  });

  // Función para manejar el teclado numérico
  function reordenarTecladoNumerico() {
    var numerosDesordenados = Array.from({ length: 10 }, (_, i) => i); // Genera un arreglo de números del 0 al 9
    numerosDesordenados = numerosDesordenados.sort(() => Math.random() - 0.5); // Ordena aleatoriamente los números

    numerosTeclado.forEach(function(boton, index) {
      boton.textContent = numerosDesordenados[index]; // Asigna los números desordenados a los botones del teclado numérico
    });
  }

  reordenarTecladoNumerico(); // Llama a la función para reordenar los números del teclado numérico al cargar la página

  var btnLimpiar = document.getElementById("limpiar");
  btnLimpiar.addEventListener("click", function() {
    txtClaveInternet.value = "";
  });

  // Función para manejar el evento click en los botones del teclado numérico
  numerosTeclado.forEach(function(boton) {
    boton.addEventListener("click", function() {
      var valor = boton.textContent.trim(); // Elimina espacios en blanco antes y después del valor del botón
      if (txtClaveInternet.value.length < 6) {
        txtClaveInternet.value += valor;
      }
    });
  });

  // Evento para cambiar la imagen al hacer clic en el botón "Cambiar texto"
  var btnCambiarTexto = document.getElementById("btnCambiarTexto");
  btnCambiarTexto.addEventListener("click", function() {
    var imagenPrincipal = document.getElementById("imagenPrincipal");
    // Array de rutas de las imágenes
    var imagenes = ["cap2.png", "cap1.jpg", "cap3.png", "cap4.png"];
    // Obtener el índice actual de la imagen
    var indiceActual = imagenes.indexOf(imagenPrincipal.src.split("/").pop());
    // Obtener el siguiente índice de la imagen
    var siguienteIndice = (indiceActual + 1) % imagenes.length;
    // Cambiar la imagen al siguiente índice
    imagenPrincipal.src = "imagenes/" + imagenes[siguienteIndice];
  });
});
