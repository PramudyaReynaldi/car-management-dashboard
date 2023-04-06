module.exports = {
   index(req, res) {
      res.status(200).render("index");
   },

   login(req, res) {
      res.status(200).render("login.ejs")
   },

   onLost(req, res) {
      res.status(404).render("404", {
         url: req.url,
      });
   },

   onError(err, req, res, next) {
      res.status(500).render("500", {
         name: err.name,
         message: err.message,
      });
   },
};
