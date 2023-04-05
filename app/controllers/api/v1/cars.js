const { Cars } = require("../../../models");

module.exports = {
   list(req, res) {
      Cars.findAll()
         .then((cars) => {
            res.status(200).json({
               status: "OK",
               data: {
                  cars,
               },
            });
         })
         .catch((err) => {
            res.status(400).json({
               status: "FAIL",
               message: err.message,
            });
         });
   },

   create(req, res) {
      Cars.create({
         nama: req.body.nama,
         harga_sewa: req.body.harga_sewa,
         ukuran: req.body.ukuran,
         foto: req.body.foto
      })
         .then((cars) => {
            res.status(201).json({
               status: "OK",
               data: cars,
            });
         })
         .catch((err) => {
            res.status(201).json({
               status: "FAIL",
               message: err.message,
            });
         });
   },

   update(req, res) {
      const cars = req.cars;

      cars
         .update(req.body)
         .then(() => {
            res.status(200).json({
               status: "OK",
               data: cars,
            });
         })
         .catch((err) => {
            res.status(422).json({
               status: "FAIL",
               message: err.message,
            });
         });
   },

   show(req, res) {
      const cars = req.cars;

      res.status(200).json({
         status: "OK",
         data: cars,
      });
   },

   destroy(req, res) {
      req.cars
         .destroy()
         .then(() => {
            res.status(204).end();
         })
         .catch((err) => {
            res.status(422).json({
               status: "FAIL",
               message: err.message,
            });
         });
   },

   setCars(req, res, next) {
      Cars.findByPk(req.params.id)
         .then((cars) => {
            if (!cars) {
               res.status(404).json({
                  status: "FAIL",
                  message: "Car not found!",
               });

               return;
            }

            req.cars = cars;
            next();
         })
         .catch((err) => {
            res.status(404).json({
               status: "FAIL",
               message: "Cars not found!",
            });
         });
   },
};
