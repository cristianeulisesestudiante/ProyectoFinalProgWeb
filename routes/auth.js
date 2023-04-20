const express = require("express");

const router = express.Router();

const authController = require("../controllers/AuthController");
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, authController.GetLogin);
router.post("/", isAuth, authController.PostLogin);

router.get("/crear-usuario", isAuth, authController.GetCrearUsuario);
router.post("/crear-usuario", isAuth, authController.PostCrearUsuario);

router.get("/resetear-password", isAuth, authController.GetResetearPassword);
router.post("/resetear-password", isAuth, authController.PostResetearPassword);

router.get(
  "/actualizar-password/:token",
  isAuth,
  authController.GetActualizarPassword
);
router.post(
  "/actualizar-password",
  isAuth,
  authController.PostActualizarPassword
);

router.get(
  "/activar-usuario/:usuario",
  isAuth,
  authController.GetActivarUsuario
);
router.post("/activar-usuario", isAuth, authController.PostActivarUsuario);

router.post("/cerrar-session", authController.PostLogout);

module.exports = router;
