$(document).ready(function () {
   $("#btn-save-post").on("click", function (e) {
      e.preventDefault();
      const valueDescription = $("#description").val();
      const valueImage = $("#post-image").val();

      
      if (!validation(valueDescription) || !validation(valueImage)){
         $("[name=form-save-post]").submit();
      }
      else {
         validatorColor("#description", valueDescription);
         validatorColor("#post-image", valueImage);
         alert("Tienes que llenar al menos un campo (la descripción o la imagen)");
      }
   });

   $("[name=btn-delete-post]").on("click", function (e) {
      e.preventDefault();
      if (confirm("¿Estas seguro que quieres borrar la publicación?")) {
         $("[name=form-delete-post]").submit();
      }
   });
   $("[name=btn-delete-amigo]").on("click", function (e) {
      e.preventDefault();
      if (confirm("¿Estas seguro que quieres eliminar el amigo?")) {
         $("[name=form-delete-amigo]").submit();
      }
   });
});

function validatorColor(input, value) {
   if (value == "" || value == undefined || value == null) {
      $(input).addClass("input-error");
      $(input).removeClass("input-success");
      return true;
   } else {
      $(input).removeClass("input-error");
      $(input).addClass("input-success");
      return false;
   }
}
function validation(value) {
   if (value == "" || value == undefined || value == null) {
      return true;
   } else {
      return false;
   }
}
