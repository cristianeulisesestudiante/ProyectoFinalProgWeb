$(document).ready(function () {
  const userName = $("#usuario");
  const nombre = $("#nombre");
  const apellido = $("#apellido");
  const correo = $("#correo");
  const telefono = $("#telefono");
  const imagen = $("#foto");
  const password = $("#password");
  const confirmarPassword = $("#confirm-password");

  $("#btn-crear-usuario").on("click", function (e) {
    e.preventDefault();

    if (validarCampos()) {
      $("#crear-usuario-form").submit();
    }
  });

  $("#telefono").on("input", function (event) {
    let currentValue = event.target.value;

    let numerosValidos = currentValue.replace(/\D/g, "");

    let formateado = "";
    for (let i = 0; i < numerosValidos.length && i < 10; i++) {
      if (i == 3 || i == 6) {
        formateado += "-";
      }
      formateado += numerosValidos.charAt(i);
    }

    $(this).val(formateado);
  });

  function validarCampos() {
    let userNameValue = userName.val();
    let nombreValue = nombre.val();
    let apellidoValue = apellido.val();
    let correoValue = correo.val();
    let telefonoValue = telefono.val();
    let imagenValue = imagen.val();
    let passwordValue = password.val();
    let confirmarPasswordValue = confirmarPassword.val();

    let isValid = true;

    isValid = validarInput(userName, userNameValue, isValid);
    isValid = validarInput(nombre, nombreValue, isValid);
    isValid = validarInput(apellido, apellidoValue, isValid);
    isValid = validarInput(correo, correoValue, isValid);

    if (validarInput(telefono, telefonoValue, isValid)) {
      isValid = validarTelefono(telefono);
    } else {
      isValid = validarInput(telefono, telefonoValue, isValid);
    }

    isValid = validarInput(imagen, imagenValue, isValid);
    if (
      validarInput(password, passwordValue, isValid) &&
      validarInput(confirmarPassword, confirmarPasswordValue, isValid)
    ) {
      isValid = validarPasswords(password, confirmarPassword);
    } else {
      isValid = validarInput(password, passwordValue, isValid);
      isValid = validarInput(
        confirmarPassword,
        confirmarPasswordValue,
        isValid
      );
    }

    return isValid;
  }

  function validarInput(id, value, isValid) {
    if (value == "" || value == null || value == undefined) {
      $(id).addClass("input-error");
      $(id).removeClass("input-success");
      $(id).closest("div").find("p").removeClass("d-none");
      return false;
    } else {
      $(id).addClass("input-success");
      $(id).removeClass("input-error");
      $(id).closest("div").find("p").addClass("d-none");
      if (!isValid) {
        return false;
      }
      return true;
    }
  }

  function validarTelefono(telefono) {
    let telefonoValue = telefono.val();

    if (telefonoValue.length !== 12) {
      $(telefono).addClass("input-error");
      $(telefono).removeClass("input-success");
      $("#telefono-invalido").removeClass("d-none");
      $("#telefono-invalido").addClass("d-block");
      return false;
    } else {
      $(telefono).addClass("input-success");
      $(telefono).removeClass("input-error");
      $("#telefono-invalido").removeClass("d-block");
      $("#telefono-invalido").addClass("d-none");
      return true;
    }
  }

  function validarPasswords(password, confirm) {
    let passwordValue = password.val();
    let confirmarPasswordValue = confirm.val();

    if (passwordValue !== confirmarPasswordValue) {
      $(password).addClass("input-error");
      $(password).removeClass("input-success");
      $(confirm).addClass("input-error");
      $(confirm).removeClass("input-success");
      $(".non-equal-password").removeClass("d-none");
      $(".non-equal-password").addClass("d-block");
      return false;
    }

    $(password).addClass("input-success");
    $(password).removeClass("input-error");
    $(confirm).addClass("input-success");
    $(confirm).removeClass("input-error");
    $(".non-equal-password").removeClass("d-block");
    $(".non-equal-password").addClass("d-none");
    return true;
  }
});
