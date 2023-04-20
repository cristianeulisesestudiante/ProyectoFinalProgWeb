const express = require("express");

const router = express.Router();

const eventosController = require("../controllers/eventosController");
const isNotAuth = require("../middleware/isNotAuth");

router.get("/eventos", isNotAuth, eventosController.GetInvitacionesEventos);
router.get("/invitaciones-eventos", isNotAuth, eventosController.GetInvitacionesEventos);
router.get("/eventos-list", isNotAuth, eventosController.GetEventosList);
router.get("/add-eventos", isNotAuth, eventosController.GetAddEvento);
router.post("/add-eventos", isNotAuth, eventosController.PostAddEventos);
router.post("/delete-eventos", isNotAuth, eventosController.PostDeleteEventos);
router.get("/search/:eventId", isNotAuth, eventosController.GetSearch);
router.post("/search", isNotAuth, eventosController.PostSearch);
router.post("/add-amigo-event", isNotAuth, eventosController.PostInvitarAmigoEvento);
module.exports = router;
