const jwt = require("jsonwebtoken");
const { User } = require("../../../models");
const {
   checkPassword,
   encryptPassword,
   createToken,
} = require("../../../../utils/password");

module.exports = {
   async login(req, res) {
      const { email, password } = req.body;

      const user = await User.findOne({
         where: { email },
      });

      if (!user) {
         res.status(404).json({
            message: "Email tidak ditemukan!",
         });
      }

      const isPasswordCorrect = await checkPassword(password, user.password);

      if (!isPasswordCorrect) {
         res.status(401).json({
            message: "Password Salah!",
         });
         return;
      }

      const userData = {
         id: user.id,
         email: user.email,
         role: user.role,
         createdAt: user.createdAt,
         updatedAt: user.updatedAt,
      };

      const token = createToken(userData);

      res.status(201).json({
         ...userData,
         token,
      });
   },

   async logout(req, res) {
      req.session.destroy();
      res.redirect("/login");
   },

   async userList(req, res) {
      try {
         const list = await User.findAll();
         res.status(201).json({
            status: "OK",
            data: {
               list
            }
         })
      }
      
      catch(err) {
         res.status(400).json({
            status: "FAIL",
            message: err.message,
         });
      }
      
   },

   async register(req, res) {
      const { firstName, lastName, email, password } = req.body;

      const encryptedPassword = await encryptPassword(password);
      try {
         const user = await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
         });
         return res.status(201).json({
            status: "OK",
            data: user,
         });
      } catch (e) {
         res.status(400).json({
            status: "FAIL",
            message: e.message,
         });
      }
   },

   async whoami(req, res) {
      res.status(200).json(req.user);
   },

   async authorize(req, res, next) {
      try {
         const bearerToken = req.headers.authorization;
         const token = bearerToken.split("Bearer ")[1];
         const tokenPayload = jwt.verify(
            token,
            process.env.JWT_SIGNATURE_KEY || "Rahasia"
         );

         req.user = await User.findByPk(tokenPayload.id);
         next();
      } catch (e) {
         res.status(401).json({
            message: "Unauthorized",
         });
      }
   },
};
