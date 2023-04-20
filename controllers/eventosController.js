const Amigos = require("../models/Amigos");
const Usuarios = require("../models/Usuarios");
const Eventos = require("../models/eventos");
const InvitadosEventos = require("../models/invitadosEventos");

exports.GetEventosList = async (req, res, next) => {
   const result = await Eventos.findAll({ where: { usuarioId: req.user.id } });
   const eventosList = result.map((result) => result.dataValues);
   res.render("eventos/eventos-list", {
      hasEventoActive: true,
      pageTitle: "Eventos",
      hasEventos: eventosList.length > 0,
      events: eventosList,
      hasEventoActive: true,
      eventosActive: true,
   });
};

exports.GetAddEvento = (req, res, next) => {
   res.render("eventos/save-eventos", {
      hasEventoActive: true,
      pageTitle: "Crear Evento",
      eventosActive: true,
   });
};

exports.PostAddEventos = (req, res, next) => {
   const name = req.body.Name;
   const fechaCreacion = req.body.FechaCreacion;
   const fechaFinalizacion = req.body.FechaFinalizacion;
   const lugar = req.body.Lugar;
   const cantidad = req.body.Cantidad;

   Eventos.create({
      name: name,
      fechaFinalizacion: fechaFinalizacion,
      fechaCreacion: fechaCreacion,
      lugar: lugar,
      cantidad: cantidad,
      usuarioId: req.user.id,
   })
      .then((result) => {
         return res.redirect("/eventos-list");
      })
      .catch((e) => {
         console.log(e);
         return res.redirect("/eventos-list");
      });
};

exports.PostDeleteEventos = async (req, res, next) => {
   const eventoId = req.body.eventoId;

   Eventos.destroy({ where: { id: eventoId } })
      .then((result) => {
         res.redirect("/eventos-list");
      })
      .catch((e) => {
         console.log(e);
      });
};

exports.PostSearch = async (req, res, next) => {
   const search = req.body.Search;

   try {
      const response = await Amigos.findAll({
         include: [{ model: Usuarios, as: "amigo" }],
      });

      const amigosInfo = response.map((elem) => {
         return elem.dataValues;
      });

      const amigosAll = amigosInfo.map((elem) => {
         return elem.amigo.dataValues;
      });

      const amigosNames = amigosAll.filter((elem) => {
         if (elem.nombre_user.toLowerCase().includes(search.toLowerCase())) {
            return elem;
         }
      });
      const eventoId = req.body.EventoId;
      return res.render("eventos/invitacion-evento", {
         hasAmigos: amigosNames.length > 0,
         amigos: amigosNames,
         Buscando: true,
         eventoId: eventoId,
         eventosActive: true,
         pageTitle: "Invitar Amigos",
      });
   } catch (error) {
      console.log(error);
   }
};

exports.GetSearch = async (req, res, next) => {
   const eventoId = req.params.eventId;
   res.render("eventos/invitacion-evento", { eventoId: eventoId, pageTitle: "Invitacion" });
};

exports.PostInvitarAmigoEvento = async (req, res, next) => {
   const invitadoId = req.body.AmigoId;
   const eventoId = req.body.EventoID;
   try {
      const result = await InvitadosEventos.create({
         id_invitado: invitadoId,
         aceptado: 0,
         eventoId: eventoId,
         usuarioId: req.user.id,
      });

      res.render("eventos/invitacion-evento");
   } catch (error) {}
};

exports.GetInvitacionesEventos = async (req, res, next) => {
   let result = await InvitadosEventos.findAll({
      where: { id_invitado: req.user.id },
      include: [{ model: Eventos }, { model: Usuarios }],
   });
   const invitaciones = result.map((result) => result.dataValues);
   const eventosIds = [];
   const eventos = [];

   res.render("eventos/invitaciones", {
      invitaciones: invitaciones,
      eventos: eventos,
      eventosActive: true,
      pageTitle: "Invitaciones",
   });
};
