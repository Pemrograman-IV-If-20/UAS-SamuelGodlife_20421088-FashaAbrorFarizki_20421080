
const express = require('express')
const app = express()
const mongosee = require('mongoose')
const dbConfig = require('./config/dbConfig')

app.use(express.json())

app.use(express.urlencoded({
    extended: true

}))

mongosee.connect(dbConfig.mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> {
   console.log("Berhasil Konek ke mongodb")

}).catch(err => {
   console.log(err)
})

app.get('/', function (req, res) {
  res.send('Selamat Datang')
})


app.use('/users', require('./routes/userRoutes'))
app.use('/kategori', require('./routes/kategoriRoutes'))
app.use('/barang', require('./routes/barangRoutes'))
app.use('/keranjang', require('./routes/keranjangRoutes'))
app.use('/transaksi', require('./routes/transaksiRoutes'))

app.use('/gambar-barang', express.static('public/images'));

const port = 3000
app.listen(port, () => {
  console.log('Server Berjalan di Port')
})

