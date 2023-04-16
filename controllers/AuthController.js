const Usuarios = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const transporter = require("../../../ProyectoFinalProgWeb/services/EmailService");
const { Op } = require("sequelize");

exports.GetLogin = (request, response, next) => {
  return response.render("auth/login", {
    pageTitle: "Login",
  });
};

exports.PostLogin = async (request, response, next) => {
  const usuarioName = request.body.Usuario;
  const password = request.body.Password;

  try {
    const userExist = await Usuarios.findOne({
      where: { nombre_user: usuarioName },
    });

    if (!userExist) {
      request.flash("Error", "El usuario o la contraseña son incorrectos");
      return response.redirect("/");
    }

    if (!userExist.estado) {
      request.flash("Error", "Este usuario no esta activo");
      return response.redirect("/");
    }

    const userValid = await bcrypt.compare(password, userExist.password);

    if (!userValid) {
      request.flash("Error", "El usuario o la contraseña son incorrectos");
      return response.redirect("/");
    }

    request.session.LoggedIn = true;
    request.session.user = userExist;
    return request.session.save((err) => {
      if (err) {
        request.flash("Error", "Ha ocurrido un error al intentar loguearse");
        console.log(error);
        return response.redirect("/");
      }
      response.redirect("/no-se");
    });
  } catch (error) {
    request.flash("Error", "Ha ocurrido un error al intentar loguearse");
    console.log(error);
    return response.redirect("/");
  }
};

exports.GetCrearUsuario = (request, response, next) => {
  return response.render("auth/crear-usuario", {
    pageTitle: "Crear Usuario",
  });
};

exports.PostCrearUsuario = async (request, response, next) => {
  const usuarioName = request.body.Usuario;
  const nombre = request.body.Nombre;
  const apellido = request.body.Apellido;
  const correo = request.body.Correo;
  const telefono = request.body.Telefono;
  const imagePath = request.file.path;
  const password = request.body.Password;
  const confirmPassword = request.body.ConfirmPassword;

  if (password !== confirmPassword) {
    request.flash("Error", "Las contraseñas no son iguales");
    return response.redirect("/crear-usuario");
  }

  try {
    const userExist = await Usuarios.findOne({
      where: { nombre_user: usuarioName },
    });

    if (userExist) {
      return response.render("auth/crear-usuario", {
        pageTitle: "Crear Usuario",
        hasData: true,
        data: {
          Usuario: usuarioName,
          Nombre: nombre,
          Apellido: apellido,
          Correo: correo,
          Telefono: telefono,
          Password: password,
          ConfirmPassword: confirmPassword,
        },
        userExist: true,
      });
    }

    transporter.sendMail(
      {
        from: "delacruzmaicol02@gmail.com",
        to: correo,
        subject: "Activar cuenta",
        html: `<h3>Hola ${nombre},</h3>
          <p>Se ha creado tu cuenta exitosamente, <a href="http://localhost:3000/activar-usuario/${usuarioName}">Pulsa aqui para activarla</a></p>`,
      },
      (error) => {
        if (error) {
          request.flash(
            "Error",
            "Ha ocurrido un error al intentar enviar el correo"
          );
          return response.render("auth/crear-usuario", {
            pageTitle: "Crear Usuario",
            hasData: true,
            data: {
              Usuario: usuarioName,
              Nombre: nombre,
              Apellido: apellido,
              Correo: correo,
              Telefono: telefono,
              Password: password,
              ConfirmPassword: confirmPassword,
            },
          });
        }
      }
    );

    const hashedPassword = await bcrypt.hash(password, 12);

    await Usuarios.create({
      nombre,
      apellido,
      correo,
      password: hashedPassword,
      telefono,
      nombre_user: usuarioName,
      estado: false,
      image_path: "/" + imagePath,
    });

    request.flash(
      "Success",
      "Usuario Creado con exito, se te ha enviado un correo para activar tu cuenta"
    );
    return response.redirect("/");
  } catch (error) {
    request.flash("Error", "Ha ocurrido un error al intentar crear el usuario");
    console.log(error);
    return response.redirect("/crear-usuario");
  }
};

exports.GetResetearPassword = (request, response, next) => {
  return response.render("auth/reset-password", {
    pageTitle: "Resetear Contraseña",
  });
};

exports.PostResetearPassword = async (request, response, next) => {
  const usuarioName = request.body.Usuario;

  try {
    const userExist = await Usuarios.findOne({
      where: { nombre_user: usuarioName },
    });

    if (!userExist) {
      request.flash("Error", "Este usuario no existe");
      return response.redirect("/resetear-password");
    }

    crypto.randomBytes(32, (error, buffer) => {
      if (error) {
        request.flash(
          "Error",
          "Ha ocurrido un error al intentar resetear la contraseña"
        );
        console.log(error);
        return response.redirect("/resetear-password");
      }

      const token = buffer.toString("hex");

      userExist.resetToken = token;
      userExist.resetTokenExpiration = Date.now() + 3600000; // 1 hour

      userExist.save();

      transporter.sendMail(
        {
          from: "delacruzmaicol02@gmail.com",
          to: userExist.correo,
          subject: "Resetear Contraseña",
          html: `<h3>Hola ${userExist.nombre},</h3>
          <p>Se ha enviado este correo para resetear tu contraseña </p>
          <p><a href="http://localhost:3000/actualizar-password/${token}">Pulsa aqui</a></p>`,
        },
        (error) => {
          if (error) {
            request.flash(
              "Error",
              "Ha ocurrido un error al intentar enviar el correo"
            );
            return response.redirect("/resetear-password");
          }
        }
      );

      request.flash("Success", "Se te ha enviado un nuevo correo");
      return response.redirect("/");
    });
  } catch (error) {
    request.flash(
      "Error",
      "Ha ocurrido un error al intentar resetear la contraseña"
    );
    console.log(error);
    return response.redirect("/resetear-password");
  }
};

exports.GetActualizarPassword = async (request, response, next) => {
  const token = request.params.token;

  try {
    const userExist = await Usuarios.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gte]: Date.now() },
      },
    });

    if (!userExist) {
      request.flash("Error", "Token invalido o expirado");
      return response.redirect("/");
    }

    return response.render("auth/actualizar-password", {
      pageTitle: "Actualizar Contraseña",
      passwordToken: token,
      usuarioId: userExist.id,
    });
  } catch (error) {
    request.flash(
      "Error",
      "Ha ocurrido un error al intentar actualizar la contraseña"
    );
    console.log(error);
    return response.redirect("/actualizar-password");
  }
};

exports.PostActualizarPassword = async (request, response, next) => {
  const password = request.body.Password;
  const confirmPassword = request.body.ConfirmPassword;
  const token = request.body.PasswordToken;
  const usuarioId = request.body.UsuarioId;

  if (password !== confirmPassword) {
    request.flash("Error", "Las contraseñas no son iguales");
    return response.redirect("/resetear-password");
  }

  try {
    const user = await Usuarios.findOne({
      where: {
        resetToken: token,
        id: usuarioId,
        resetTokenExpiration: { [Op.gte]: Date.now() },
      },
    });

    if (!user) {
      request.flash("Error", "No se puedo validar correctamente el usuario");
      return response.redirect("/");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    user.save();

    request.flash("Success", "Contraseña actualizada correctamente");
    return response.redirect("/");
  } catch (error) {
    request.flash(
      "Error",
      "Ha ocurrido un error al intentar actualizar la contraseña"
    );
    console.log(error);
    return response.redirect("/");
  }
};

exports.GetActivarUsuario = async (request, response, next) => {
  const usuario = request.params.usuario;

  try {
    const user = await Usuarios.findOne({
      where: { nombre_user: usuario },
    });

    if (!user) {
      request.flash("Error", "Este usuario no existe");
      return response.redirect("/");
    }

    user.estado = true;
    user.save();

    request.flash("Success", "Usuario activado correctamente");
    return response.render("auth/activar-usuario", {
      pageTitle: "Activar Usuario",
      usuarioId: user.id,
    });
  } catch (error) {
    request.flash(
      "Error",
      "Ha ocurrido un error al intentar activar el usuario"
    );
    console.log(error);
    return response.redirect("/");
  }
};

exports.PostActivarUsuario = async (request, response, next) => {
  const usuarioId = request.body.UsuarioId;

  try {
    const user = await Usuarios.findOne({
      where: { id: usuarioId },
    });

    if (!user) {
      request.flash("Error", "Este usuario no existe");
      return response.redirect("/");
    }

    user.estado = true;
    user.save();
    request.flash("Success", "Usuario activado con exito");
    return response.redirect("/");
  } catch (error) {
    request.flash(
      "Error",
      "Ha ocurrido un error al intentar activar el usuario"
    );
    console.log(error);
    return response.redirect("/");
  }
};
