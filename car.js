const { cars } = require("./models");

class CarController {
   static records = [];

   constructor(params) {
      this.nama = params.nama;
      this.harga_sewa = params.harga_sewa;
      this.ukuran = params.ukuran;
      this.foto = params.foto;
   }

   static create(params) {
      const obj = new this(params);
      const result = cars.create(obj);

      return result;
   }

   static list() {
      const result = cars.findAll();
      return result;
   }

   static find(id) {
      const result = cars.findByPk(id);

      return result;
   }

   static update(id, params) {
      const result = cars.update(params, {
         where: {
            id: id,
         },
      });

      return result;
   }

   static delete(id) {
      const result = cars.destroy({
         where: { id: id },
      });

      return result;
   }
}

module.exports = CarController;
