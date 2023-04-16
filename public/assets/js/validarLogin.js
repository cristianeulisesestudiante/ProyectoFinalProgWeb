$(document).ready(function () {
  const userName = $("#usuario");
  const password = $("#password");

  $("#btn-iniciar-sesion").on("click", function (e) {
    e.preventDefault();

    if (validarCampos()) {
      $("#inicar-sesion-form").submit();
    }
  });

  function validarCampos() {
    let userNameValue = userName.val();
    let passwordValue = password.val();

    let isValid = true;

    isValid = validarInput(userName, userNameValue, isValid);
    isValid = validarInput(password, passwordValue, isValid);

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
});
