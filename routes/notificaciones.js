const express = require("express");
const router = express.Router();

const notificacionesController = require("../controllers/NotificacionesController");
const isNotAuth = require("../middleware/isNotAuth");
router.get("/notificaciones", isNotAuth, notificacionesController.GetNotificaciones);
router.post("/aceptar-solicitud", isNotAuth, notificacionesController.PostAceptarSolicitud);
router.post("/rechazar-solicitud", isNotAuth, notificacionesController.PostRechazarSolicitud);

module.exports = router;
