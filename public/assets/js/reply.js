function reply(id,route) {
   const inputComment = document.createElement("input");
   const btnSave = document.createElement("button");
   const btnDiscard = document.createElement("a");
   const divComment = document.getElementById(`div-comment-${id}`);
   const botones = document.getElementsByName("Botones");
   botones.forEach(element => element.setAttribute('class', 'btn btn-respuesta disabled'))
   btnDiscard.setAttribute('class', 'btn btn-discard ')
   btnDiscard.setAttribute('href', "/home")
   inputComment.setAttribute("id", `input-comment-${id}`);
   inputComment.setAttribute("name", `Comentario`);
   inputComment.setAttribute("class", `input-comment`);
   btnSave.setAttribute('type', 'submit');
   btnSave.setAttribute('class', 'btn btn-save');
   btnDiscard.setAttribute('onclick', 'discardComment()');
   btnSave.innerText = "Publicar"
   btnDiscard.innerText = "Descartar"
   divComment.appendChild(inputComment);
   divComment.appendChild(btnSave);
   divComment.appendChild(btnDiscard);
   inputComment.focus();
}
