module.exports = (request, response, next) => {
  if (!request.session.LoggedIn) {
    request.flash("Error", "No estas autorizado");
    return response.redirect("/");
  }

  return next();
};
