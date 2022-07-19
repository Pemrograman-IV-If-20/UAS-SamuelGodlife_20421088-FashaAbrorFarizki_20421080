const barangModels = require("../models/barangModels")
const objectId = require("mongoose").Types.ObjectId

exports.input = (data) => 
    new Promise((resolve, reject)=> {
        barangModels.create(data)
        .then (()=>{
            resolve({
                status: true,
                msg: "Berhasil Input Barang",
            });
        })
        .catch((err)=> {
            reject({
                status: false,
                msg: "Terjadi kesalahan pada server",
            });
        });
    });

    exports.getAllBarang = () => 
        new Promise((resolve, reject) => {
            barangModels.aggregate([
                {
                    $lookup: {
                        from: "kategoris",
                        localField: "idKategori",
                        foreignField: "_id",
                        as: "kategoriBarang",
                    },
                },
                {
                    $unwind: "$kategoriBarang",
                },
            ])
            .then((barangs)=>{
                if(barangs.length > 0) {
                    resolve({
                        status: true,
                        msg: "Berhasil memuat data",
                        data: barangs
                    })
                } else {
                    reject({
                        status: false,
                        msg: "Tidak ada data"
                    })
                }

            }).catch((err)=> {
                reject({
                    status: false,
                    msg: "Terjadi kesalahan pada server"
                })
            });
        });

        exports.getBarangById = (idBarang) =>
        new Promise((resolve, reject) => {
            barangModels
            .aggregate([
                {
                    $match: {_id: objectId(idBarang)}
                },
                {
                    $lookup: {
                        from: "kategoris",
                        localField: "idKategori",
                        foreignField: "_id",
                        as: "kategoriBarang",
                    },
                },
                {
                    $unwind: "$kategoriBarang",
                },
            ])
            .then((barangs)=>{
                if(barangs.length > 0) {
                    resolve({
                        status: true,
                        msg: "Berhasil memuat data",
                        data: barangs[0],
                    })
                } else {
                    reject({
                        status: false,
                        msg: "Tidak ada data"
                    })
                }

            }).catch((err)=> {
                reject({
                    status: false,
                    msg: "Terjadi kesalahan pada server"
                })
            });
        });

        exports.update = (idBarang, data) =>
        new Promise((resolve, reject) => {
            barangModels.updateOne({_id: objectId(idBarang)}, data)
            .then(() =>{
                resolve({
                    status: true,
                    msg: "Data berhasil dirubah"
                })

            }).catch((err)=>{
                reject({
                    status: false,
                    msg: "Terjadi Kesalahan pada server"
                });
            });
        });

        exports.delete = (idBarang) =>
         new Promise((resolve, reject) => {
        barangModels.deleteOne({_id: objectId(idBarang)})
        .then(()=>{
            resolve({
                status: true,
                msg: "Berhasil Menghapus data"
              })
              
             }).catch(()=>{
              reject({
                    status: false,
                    msg: "Terjadi Kesalahan Pada server"

                  });
             });
          })

