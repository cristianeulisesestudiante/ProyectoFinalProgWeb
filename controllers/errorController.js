exports.Get404 = (request, response, next) => {
  response.render("error/404", {
    pageTitle: "Page not found",
  });
};
