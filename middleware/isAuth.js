module.exports = (request, response, next) => {
  if (request.session.LoggedIn) {
    request.flash("Error", "Ya estas logueado");
    return response.redirect("/no-se");
  }

  next();
};
