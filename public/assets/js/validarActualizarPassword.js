$(document).ready(function () {
  const password = $("#password");
  const confirmarPassword = $("#confirm-password");

  $("#btn-actualizar-password").on("click", function (e) {
    e.preventDefault();

    if (validarCampos()) {
      $("#actualizar-password-form").submit();
    }
  });

  function validarCampos() {
    let passwordValue = password.val();
    let confirmarPasswordValue = confirmarPassword.val();

    let isValid = true;

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
