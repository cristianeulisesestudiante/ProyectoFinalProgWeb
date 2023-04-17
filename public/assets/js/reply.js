// $(document).ready(function () {
//    $("[name=btn-reply]").on("click", function (e) {
//       const divComment = document.getElementsByName("comment");
//       console.log(divComment);
//       const inputComment = document.createElement("h1");
//       inputComment.innerText = "Hol"
//       divComment.appendChild(inputComment);
//       inputComment.focus();
//    });
// });

function reply(id,route) {
   //    btn[index].setAttribute('name', `btn-${index}`)
   //    inputComment.setAttribute("name", `input-${index}`);
   const inputComment = document.createElement("input");
   const btnSave = document.createElement("button");
   const btnDiscard = document.createElement("a");
   const divComment = document.getElementById(`div-comment-${id}`);
   const botones = document.getElementsByName("Botones");
   botones.forEach(element => element.setAttribute('class', 'btn btn-primary disabled'))
   btnDiscard.setAttribute('class', 'btn btn-primary')
   btnDiscard.setAttribute('href', route)
   inputComment.setAttribute("id", `input-comment-${id}`);
   inputComment.setAttribute("name", `Comentario`);
   btnSave.setAttribute('type', 'submit');
   btnDiscard.setAttribute('onclick', 'discardComment()');
   btnSave.innerText = "Publicar"
   btnDiscard.innerText = "Descartar"
   divComment.appendChild(inputComment);
   divComment.appendChild(btnSave);
   divComment.appendChild(btnDiscard);
   inputComment.focus();
}

function discardComment() {
   
}
