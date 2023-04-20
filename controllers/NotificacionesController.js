const Notificaciones = require("../models/Notificaciones");
const Usuarios = require("../models/Usuarios");
const Amigos = require("../models/Amigos");

exports.GetNotificaciones = async (request, response, next) => {
  try {
    const notificacionesAll = await Notificaciones.findAll({
      where: { usuarioSolicitadoId: request.user.id },
      include: [{ model: Usuarios }],
    });

    const notificacionesData = notificacionesAll.map((notificacion) => {
      return notificacion.dataValues;
    });

    const notificacionesAmigos = notificacionesData.map((notificacion) => {
      return {
        id: notificacion.id,
        usuarioSolicitadoId: notificacion.usuarioSolicitadoId,
        usuarioId: notificacion.usuarioId,
        usuario: notificacion.usuario.dataValues,
      };
    });

    console.log(notificacionesAmigos);

    return response.render("notificaciones/notificaciones-home", {
      pageTitle: "Notificaciones",
      notificaciones: notificacionesAmigos,
      notificacionesActive: true,
    });
  } catch (error) {
    request.flash(
      "Error",
      "Ha ocurrido un error al intentar mostrar las notificaciones"
    );
    console.log(error);
    return response.redirect("/notificaciones");
  }
};

exports.PostAceptarSolicitud = async (request, response, next) => {
  const usuarioId = request.body.UsuarioId;
  const notificacionId = request.body.NotificacionId;
  try {
    await Amigos.create({
      usuarioId: request.user.id,
      usuarioAmigoId: usuarioId,
    });

    await Amigos.create({
      usuarioId: usuarioId,
      usuarioAmigoId: request.user.id,
    });

    await Notificaciones.destroy({ where: { id: notificacionId } });

    request.flash("Success", "Usuario añadido con exito");
    return response.redirect("/notificaciones");
  } catch (error) {
    request.flash(
      "Error",
      "Ha ocurrido un error al intentar agregar el usuario"
    );
    console.log(error);
    return response.redirect("/notificaciones");
  }
};

exports.PostRechazarSolicitud = async (request, response, next) => {
  //   const usuarioId = request.body.UsuarioId;
  const notificacionId = request.body.NotificacionId;
  try {
    await Notificaciones.destroy({ where: { id: notificacionId } });

    request.flash("Success", "Solicitud rechazada");
    return response.redirect("/notificaciones");
  } catch (error) {
    request.flash(
      "Error",
      "Ha ocurrido un error al intentar rechazar el usuario"
    );
    console.log(error);
    return response.redirect("/notificaciones");
  }
};
