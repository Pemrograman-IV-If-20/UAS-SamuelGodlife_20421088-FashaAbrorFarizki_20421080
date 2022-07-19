const router = require('express').Router()

const controllerKategori = require('../controller/kategoriController')
const kategoriModel = require('../models/kategoriModel')

router.post('/inputKategori', (req, res) => {
    controllerKategori.inputKategori(req.body)
    .then((result) => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})


router.put('/updateKategoriById/:id', (req, res) => {
    controllerKategori.updateKategoriById(req.params.id,req.body)
    .then((result) => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/getAllKategori', (req, res) => {
    controllerKategori.getAllKategori()
    .then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
})

router.get('/getKategoriById/:id', (req, res) => {
    controllerKategori.getKategoriById(req.params.id)
    .then((result) => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

router.delete('/deleteKategori/:idKategori', (req, res)=> {
    controllerKategori.deleteKategori(req.params.idKategori)
    .then((result)=> {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router