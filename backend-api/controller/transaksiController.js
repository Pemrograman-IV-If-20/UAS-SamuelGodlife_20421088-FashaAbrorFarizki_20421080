const transaksiModel = require("../models/transaksiModel");
const keranjangModel = require("../models/keranjangModel");
const barangModels = require("../models/barangModels");

const objectId = require("mongoose").Types.ObjectId

exports.inputTransaksi = (data) => 
    new Promise((resolve, reject)=>{
        transaksiModel.create(data)
        .then(async()=>{
            const {detailTransaksi} = data;
            for (let i = 0; i < detailTransaksi.length; i++) {
                await barangModels.updateOne(
                 {_id: objectId(detailTransaksi[i].idBarang)},
                 {$inc: {stok: -Number(detailTransaksi[i].jumlahBeli)}},
                 );

                 await keranjangModel.deleteOne({
                    _id: objectId(detailTransaksi[i]._id),
                 })
            }
            resolve ({
                status: true,
                msg: "Transaksi Berhasil",
            });
        }).catch((err)=>{
            reject({
                status: false,
                msg: "Terjadi kesalahan pada saat transaksi"
            });
        })
    })

    exports.getAllTransaksi = () =>
    new Promise((resolve, reject)=>{
        transaksiModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user"},
        ]).then((data) =>{
            if (data.length > 0) {
                resolve ({
                    status: true,
                    message: "Berhasil memuat data",
                    data: data,
                });
            } else {
                reject ({
                    status: false,
                    message: "Tidak ada data"
                });
            }
        }).catch((err)=>{
            reject({
                status: false,
                message: "Terjadi Kesalahan server"
            });
        });
    });

    exports.getTransaksiById = (idTransaksi) =>
    new Promise((resolve, reject)=>{
        transaksiModel
        .aggregate([
            {
                $match: {_id: objectId(idTransaksi)},
            },
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user"},
        ]).then((data) =>{
            if (data.length > 0) {
                resolve ({
                    status: true,
                    message: "Berhasil memuat data",
                    data: data,
                });
            } else {
                reject ({
                    status: false,
                    message: "Tidak ada data"
                });
            }
        }).catch((err)=>{
            reject({
                status: false,
                message: "Terjadi Kesalahan server"
            });
        });
    });

    exports.getTransaksiByidUser = (idUser) =>
    new Promise((resolve, reject)=>{
        transaksiModel
        .aggregate([
            {
                $match: {idUser: objectId(idUser)}
            },
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user"},
        ]).then((data) =>{
            if (data.length > 0) {
                resolve ({
                    status: true,
                    message: "Berhasil memuat data",
                    data: data,
                });
            } else {
                reject ({
                    status: false,
                    message: "Tidak ada data"
                });
            }
        }).catch((err)=>{
            reject({
                status: false,
                message: "Terjadi Kesalahan server"
            });
        });
    });

    exports.deleteTransaksi = (idTransaksi) =>
    new Promise((resolve, reject) => {
        transaksiModel
        .deleteOne({_id: objectId(idTransaksi)})
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

