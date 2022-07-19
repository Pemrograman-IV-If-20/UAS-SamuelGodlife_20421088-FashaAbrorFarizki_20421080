const keranjangModel = require('../models/keranjangModel');
const objectId = require("mongoose").Types.ObjectId

exports.input = (data) =>
new Promise((resolve, reject) => {
    keranjangModel
    .create(data)
    .then (()=> {
        resolve({
            status: true,
            msg: "Berhasil input Keranjang",
        });
    })
    .catch((err) =>{
        reject({
            status: false,
            msg: "Gagal input keranjang",
        });
    });
});

exports.getAllKeranjang = (idUser) =>
new Promise((resolve, reject) => {
    keranjangModel
    .aggregate([
        {
            $match: {
                idUser: objectId(idUser),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "idUser",
                foreignField: "_id",
                as:"user"
            }
        },
        {
            $lookup: {
                from: "barangs",
                localField: "idBarang",
                foreignField: "_id",
                as:"barang"
            }
        },
        {
            $unwind: "$user",
        },
        {
            $unwind : "$barang",
        }
    ]).then((keranjang) =>{
        if (keranjang.length > 0) {
            resolve({
                status: true,
                msg: "Berhasil Memuat data",
                data: keranjang,
            });
        } else {
            reject({
                status: false,
                msg: "Tidak ada data",
            })
        }
    }).catch((err) => {
        reject({
            status: false,
            msg: "Terjadi kesalahan Pada server",
        })
    });
});

exports.getKeranjangById = (idKeranjang) =>
new Promise((resolve, reject) =>{
    keranjangModel
    .aggregate([
        {
            $match: {
                _id: objectId(idKeranjang),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "idUser",
                foreignField: "_id",
                as:"user"
            }
        },
        {
            $lookup: {
                from: "barangs",
                localField: "idBarang",
                foreignField: "_id",
                as:"barang"
            }
        },
        {
            $unwind: "$user",
        },
        {
            $unwind : "$barang",
        }
    ])
    .then((keranjang) =>{
        if (keranjang.length > 0) {
            resolve({
                status: true,
                msg: "Berhasil Memuat data",
                data: keranjang,
            });
        } else {
            reject({
                status: false,
                msg: "Tidak ada data",
            })
        }
    }).catch((err) => {
        reject({
            status: false,
            msg: "Terjadi kesalahan Pada server",
        });
    });
})

exports.updateKeranjang = (idKeranjang, data) =>
new Promise((resolve, reject)=>{
    keranjangModel
    .updateOne(
        {
            _id: objectId(idKeranjang),
        },
        data,
    )
    .then(()=>{
        resolve({
            status: true,
            msg: "Berhasil Update Keranjang",
        });
    }).catch((err)=>{
            reject({
                status: false,
                msg: "Terjadi Kesalahan pada server",
            });
    });
})

exports.deleteKeranjang = (idKeranjang) =>
         new Promise((resolve, reject) => {
        keranjangModel.deleteOne({_id: objectId(idKeranjang)})
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