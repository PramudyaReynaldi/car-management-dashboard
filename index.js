const express = require("express");
const app = express();
const pool = require("./db");
const { PORT = 8000 } = process.env;
const { cars } = require("./app/models");
const bodyParser = require("body-parser");
const cloudinary = require("./config/cloudinary");
const Car = require("./car");
const routes = require("./config/routes");

const jsonParser = bodyParser.json();

// app.set('views', './views'); => Method pada Express yang digunakan untuk menentukan
// direktori default untuk file template atau view yang akan digunakan pada aplikasi.
app.set("views", "./app/views");
app.set("view engine", "ejs");

// app.use(express.static('public')) => Middleware yang berfungsi untuk mengakses
// file-file statis seperti gambar, file CSS, dan file JavaScript pada direktori public.
app.use(express.static("public"));

app.use(express.json());

// CREATE
app.post("/api/v1/list-cars", jsonParser, async (req, res) => {
   try {
      const dataCars = await cars.create({
         nama: req.body.nama,
         harga_sewa: req.body.harga_sewa,
         ukuran: req.body.ukuran,
         foto: req.body.foto,
      });
      res.status(201).send(dataCars);
   } catch (error) {
      res.status(422).send("Error, tidak bisa menambah data");
   }
});

//READ
app.get("/api/v1/list-cars", jsonParser, async (req, res) => {
   const dataCars = await cars.findAll();
   res.send(dataCars);
});

// UPDATE
app.put("/api/v1/list-cars/:id", jsonParser, async (req, res) => {
   try {
      const dataCars = await cars.findByPk(req.params.id);
      dataCars.nama = req.body.nama;
      dataCars.harga_sewa = req.body.harga_sewa;
      dataCars.ukuran = req.body.ukuran;
      dataCars.foto = req.body.foto;

      await dataCars.save();
      res.status(202).send(dataCars);
   } catch (error) {
      res.status(422).send("Tidak bisa update data");
   }
});

// DELETE
app.delete("/api/v1/list-cars/:id", async (req, res) => {
   try {
      const dataCars = await cars.findByPk(req.params.id);
      dataCars.destroy();
      res.status(202).send("Terhapus");
   } catch (error) {
      res.status(422).send("Gagal menghapus");
   }
});

// VIEWS
app.get("/", async (req, res) => {
   let data = [];
   try {
      const dataCars = await Car.list(req.body);
      data = dataCars;
   } catch (error) {
      console.log(error);
   }

   res.render("list-cars", {
      data: data,
   });
});

app.get("/createCar", (req, res) => {
   res.render("createCar");
});

app.get("/update/:id", async (req, res) => {
   let data = [];
   try {
      const cars = await CarController.find(req.params.id);
      data = cars;
   } catch (error) {
      console.log(error);
   }
   res.render("update", { data: data });
});

app.get("/list-cars", async (req, res) => {
   res.render("list-cars", { title: "list-cars" });
});

app.use(routes);

app.listen(PORT, () => {
   console.log(`Server nyala di https://localhost:${PORT}`);
});
