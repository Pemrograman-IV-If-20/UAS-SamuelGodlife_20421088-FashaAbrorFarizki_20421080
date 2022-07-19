const router = require("express").Router();
const barangController = require("../controller/barangController");


const utilApps = require("../utils/utils_apps");
const multer = require("multer");
const barangModels = require("../models/barangModels");
const { isObjectIdOrHexString } = require("mongoose");
const uploadFile = multer({
    storage: utilApps.uploadFile
}).single("gambar");

router.post("/input", uploadFile, (req, res)=>{
    if(req.file === undefined) {
        res.json({
            status: false,
            msg: "Data tidak boleh kosong"
        })
    } else {
        req.body.gambar = req.file.filename
    }

    barangController.input(req.body)
        .then((result)=> {
            res.json(result);
        }).catch((error)=>{
            res.json(error);
        });
});

router.get("/get-all-barang", (req, res)=> {
    barangController.getAllBarang()
    .then((result) =>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    });
});


router.get("/get-barang-by-id/:idBarang", (req, res)=> {
    barangController
    .getBarangById(req.params.idBarang)
    .then((result) =>{
        res.json(result);
    })
    .catch((err)=>{
        res.json(err);
    });
});

router.put("/update/:idBarang", uploadFile, (req, res) => {
    if(req.file !== undefined) {
        req.body.gambar = req.file.filename
    }

    barangController
    .update(req.params.idBarang, req.body)
    .then((result) => {
        res.json(result);
    }).catch((err) =>{
        res.json(err);
    });
});

router.delete('/delete/:idBarang', (req, res)=> {
    barangController.delete(req.params.idBarang)
    .then((result)=> {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router;