const express = require("express");
const app = express();
const pool = require("./db");
const { PORT = 8000 } = process.env;
const { cars } = require("./models");
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

// app.set('views', './views'); => Method pada Express yang digunakan untuk menentukan
// direktori default untuk file template atau view yang akan digunakan pada aplikasi.
app.set("views", "./views");
app.set("view engine", "ejs");

// app.use(express.static('public')) => Middleware yang berfungsi untuk mengakses
// file-file statis seperti gambar, file CSS, dan file JavaScript pada direktori public.
app.use(express.static("public"));

app.get("/", async (req, res) => {
   res.render('layouts/main', { title: 'Dashboard' });
});

// CREATE
app.post('/cards', jsonParser, async (req, res) => {
   try {
      const dataCars = await cars.create({
         nama: req.body.nama,
         harga_sewa: req.body.harga_sewa,
         ukuran: req.body.ukuran,
         foto: req.body.foto
      });
      res.status(201).send(dataCars);
   }
   catch (error) {
      res.status(422).send('Error, tidak bisa menambah data');
   }
});

// READ
app.get('/cards', jsonParser, async (req, res) => {
   const dataCars = await cars.findAll();
   res.send(dataCars);
});

// UPDATE
app.put('/cards/:id', jsonParser, async (req, res) => {
   try {
      const dataCars = await cars.findByPk(req.params.id);
      dataCars.nama = req.body.nama
      dataCars.harga_sewa = req.body.harga_sewa
      dataCars.ukuran = req.body.ukuran
      dataCars.foto = req.body.foto

      await dataCars.save()
      res.status(202).send(dataCars)
   }
   catch (error) {
      res.status(422).send('Tidak bisa update data')
   }
});

// DELETE
app.delete('/cards/:id', async (req, res) => {
   try {
      const dataCars = await cars.findByPk(req.params.id)
      dataCars.destroy()
      res.status(202).send('Terhapus')
   }
   catch(error) {
      res.status(422).send('Gagal menghapus')
   }
})




app.listen(PORT, () => {
   console.log(`Server nyala di https://localhost:${PORT}`);
});
